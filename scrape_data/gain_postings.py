from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from itertools import repeat
import threading
from functools import wraps
import os
import parse_source
import single_job_source
import datetime
import multiprocessing
from multiprocessing import Pool, Process, Array
from time import sleep, time
from concurrent.futures import ProcessPoolExecutor, wait, ThreadPoolExecutor
import secret
account = secret.account
password = secret.password


class Concurrent_scrape:
# initiates a chrome driver
# returns a WebDriver
    def __init__(self):
        options = Options()
        options.add_argument('--headless')
        self.browser = webdriver.Chrome(executable_path=os.path.abspath('scrape_data/chromedriver'), options=options)
        #self.browser = webdriver.Chrome(executable_path=os.path.abspath('./chromedriver'), options=options)

    # connects the chrome driver to waterlooworks
    # returns a WebDriver
    def connect_to_base(self):
        base_url = 'https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm'
        try:
            self.browser.get(base_url)
            elements = self.browser.find_element_by_class_name("js--btn-search")
            elements.click()
        except Exception as ex:
            #print(f"Link failed to {base_url}")
            #print("Trying to log in")

            elements = self.browser.find_element_by_class_name("button")
            elements.click()

            elements = self.browser.find_element_by_class_name("btn--landing")
            elements.click()

            elem_user = self.browser.find_element_by_name("UserName")
            elem_user.send_keys(account)

            elements = self.browser.find_element_by_id("nextButton")
            elements.click()

            elem_pwd = self.browser.find_element_by_name("Password")
            elem_pwd.send_keys(password)

            elements = self.browser.find_element_by_class_name("submit")
            elements.click()

            self.browser.get(base_url)
            return self.browser
        return self.browser

    # return another WebDriver
    # now we are at the page with the table of job postings
    def get_source(self):
        self.browser.find_element_by_link_text("Advanced Search - Co-op Jobs").click()
        self.browser.find_element_by_name("widget1Keyword").send_keys("software")  # software is just for the purpose of testing
        # self.browser.find_element_by_partial_link_text("4 month").click() # can't find
        self.browser.find_element_by_partial_link_text("Search Job Postings").click()
        return self.browser
    
    def get_applied(self):
        pair = ''
        while (pair == ''):
            sleep(0.001)
            try:
                pair = self.browser.find_element_by_xpath("//*[@id='quickSearchCountsContainer']/table/tbody/tr[4]/td[2]/a")
            except:
                continue
        self.browser.find_element_by_xpath("//*[@id='quickSearchCountsContainer']/table/tbody/tr[4]/td[2]/a").click()
        return self.browser


# self.browser is of type WebDriver
    # goes through all job postings in one page
    #     (will call check_this_post(self.browser) multiple times)
def scrape():
    website = Concurrent_scrape()
    website.connect_to_base()
    website.get_source() 



    #website.get_applied() # CHANGE IT !!!!!!!!!!!!!!!!!!!!!!!!!



    post_nums, length, total_len = parse_source.get_posting_numbers(website.browser)
    empty = [0] * (total_len - length)
    post_nums = post_nums + empty
    post_nums.append(0)

    post_nums = Array('i', post_nums) #shared-memory array
    website.browser.close()
    def page_iteration(lock):
        #global post_nums
        #global length
        #post_nums, length = parse_source.get_posting_numbers(website.browser)
        page_checker = post_nums[post_nums[-1]]

        website = Concurrent_scrape()
        website.connect_to_base()

        website.get_source()
        


        #website.get_applied() # CHANGE IT !!!!!!!!!!!!!!!!!!!!!!!!!
        

        browser = website.browser

        

        temp_length = length
        counter = 0
        while (post_nums[-1] < total_len): # change length to total num
        #while (post_nums[-1] < 20):
            #print("count ", counter)
            while (True):
                
                # use a counter for the current page and use [-1] to enter a specific post

                #print(post_nums[-1], " compared to ", length)
                post_num = str(post_nums[post_nums[-1]])
                post_nums[-1] += 1
                
                

                #print(f"start post: {post_num}")
                current_job = "posting" + post_num
                things = browser.find_element_by_id(current_job).\
                find_elements_by_class_name("orgDivTitleMaxWidth")
                for thing in things:
                    try:
                        thing = thing.find_element_by_css_selector("a[onclick*='buildForm']")
                        browser.execute_script("arguments[0].click();", thing)
                        break
                    except:
                        print("_(:з」∠)_")
                
                thing_after = browser.window_handles[-1]
                #print("start")
                browser.switch_to.window(thing_after)
                
                #print('counter: ', counter, ' tracker: ', post_nums[-1])
                
                single_job_source.get_job_post_info(browser, lock)
                browser.close()
                browser.switch_to.window(browser.window_handles[0]) # switch back to the original window
                #print("end")
                if (post_nums[-1] >= total_len):
                    break

                # flip page and reload data into the shared array

                while (post_nums[-1] // 100 - counter) > 0:
                    counter += 1
                    #counter += times_to_flip
                    #for i in range(times_to_flip):
                    temp = browser.page_source
                    element = browser.find_element_by_xpath("//*[@id='postingsTablePlaceholder']/div[1]/div/ul/li[16]/a")
                    browser.execute_script("arguments[0].click();", element)
                    while (temp == browser.page_source):
                        sleep(0.2)

                    temp_post, temp_length, ignored = parse_source.get_posting_numbers(browser)
                    temp_post_len = len(temp_post)
                    for i in range(temp_post_len):
                        post_nums[counter * 100 + i] = temp_post[i]
                break
                            
  
    '''
    # multi-thread
    threads = [threading.Thread(target=page_iteration, args=(i,)) for i in post_nums]
    for th in threads:
        th.start()
        th.join()
    '''

    lock = multiprocessing.Lock()
    #cpu_num = multiprocessing.cpu_count()
    for i in range(12):
        Process(target=page_iteration,args=(lock,)).start()

scrape()