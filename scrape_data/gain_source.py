from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from itertools import repeat
from multiprocessing import Pool, cpu_count
import threading
from functools import wraps
import os
import parse_source
import secret
account = secret.account
password = secret.password


class Concurrent_scrape:
# initiates a chrome driver
# returns a WebDriver
    def __init__(self):
        options = Options()
        #options.add_argument('--headless')
        #self.browser = webdriver.Chrome(executable_path=os.path.abspath('scrape_data/chromedriver'), options=options)
        self.browser = webdriver.Chrome(executable_path=os.path.abspath('./chromedriver'), options=options)

    # connects the chrome driver to waterlooworks
    # returns a WebDriver
    def connect_to_base(self):
        base_url = 'https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm'
        try:
            self.browser.get(base_url)
            elements = self.browser.find_element_by_class_name("js--btn-search")
            elements.click()
        except Exception as ex:
            print(f"Link failed to {base_url}")
            print("Trying to log in")

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

    # self.browser is of type WebDriver
    # goes through all job postings in one source
    #     (will call page_iteration(self.browser) multiple times)
    def search_iteration(self, a):
        print(f"work: f{a}")
        return

    

    # self.browser is of type WebDriver, connected to a webpage showing
    # detailed info about ONE job posting
    # returns two things 
    def get_this_post(self):
        thing = self.browser.find_element_by_id("postingDiv").find_element_by_tag_name("td"); # get a better variable name
        print(f'thing is of type {type(thing)}; {thing}')
        return

    def get_source(self):
        self.browser.find_element_by_link_text("Advanced Search - Co-op Jobs").click()
        self.browser.find_element_by_name("widget1Keyword").send_keys("software")  # software is just for the purpose of testing
        # self.browser.find_element_by_partial_link_text("4 month").click() # can't find
        self.browser.find_element_by_partial_link_text("Search Job Postings").click()
        return self.browser









# ===========================
# bug code for testing purposes
# ===========================
import parse_source
import datetime
import multiprocessing
from multiprocessing import Pool
import threading
from time import sleep, time
from concurrent.futures import ProcessPoolExecutor, wait, ThreadPoolExecutor
import single_job_source



# self.browser is of type WebDriver
    # goes through all job postings in one page
    #     (will call check_this_post(self.browser) multiple times)
def page_iteration(post_num):
    #post_nums, length = parse_source.get_posting_numbers(website.browser)
    global browser
    post_num = str(post_num)
    #print(f"start post: {post_num}")
    current_job = "posting" + post_num
    things = browser.find_element_by_id(current_job).\
    find_elements_by_class_name("orgDivTitleMaxWidth")
    for thing in things:
        try:
            thing = thing.find_element_by_css_selector("a[onclick*='buildForm']")
            break
        except:
            #print("_(:з」∠)_")
    thing.click()
    thing_after = browser.window_handles[-1]
    #thing_before = browser.window_handles[0]
    browser.switch_to.window(thing_after)

    single_job_source.get_job_post_info(browser)

    browser.close()
    browser.switch_to.window(browser.window_handles[0]) # switch back to the original window
    
    #print(f"end post: {post_num}")
    #stuff = self.browser.find_element_by_id("postingDiv")
    #print(f'stuff is of type {type(stuff)}; \n {stuff}')


website = Concurrent_scrape()
website.connect_to_base()
website.get_source()
post_nums, length = parse_source.get_posting_numbers(website.browser)

start_time = time()
browser = website.browser

'''
# multi-thread
threads = [threading.Thread(target=page_iteration, args=(i,)) for i in post_nums]
for th in threads:
    th.start()
    th.join()
'''
#executor = ProcessPoolExecutor(max_workers=8)
#search_pool = Pool(8)

postings = 0
for i in range(length):
    #print(i)
    #search_pool.apply_async(page_iteration, (post_nums[i],))
    #executor.submit(page_iteration, post_nums[i]) # use the same browser, so change it to a constant
    page_iteration(post_nums[i])


#search_pool.close()
#search_pool.join()
#executor.shutdown(wait=True)



# it counts the time elapsed

end_time = time()
elapsed_time = end_time - start_time
#print(f'Elapsed run time: {elapsed_time} seconds')
print("Done")

