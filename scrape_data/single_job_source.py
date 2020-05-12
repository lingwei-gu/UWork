from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import re
from bs4 import BeautifulSoup
import time
import json
import datetime
import secret
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pymongo

# count the expired time of each posting
def count_time(ddl):
    def month_num(month):
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        for i in range(12):
            if month == months[i]:
                return i + 1
    hour = int(ddl[3][:2])
    if ddl[-1] == "PM":
        hour += 12
    deadline = datetime.datetime(int(ddl[2]), int(month_num(ddl[0])), int(ddl[1][:2]), hour, 0, 0)
    current_time = datetime.datetime.now()
    time_between = (deadline - current_time).total_seconds()
    return time_between

# browser is of type WebDriver, connected to a webpage showing
# detailed info about ONE job posting
# returns a dictionary about:
# the job's overview, the application and about the work term ratings (if there's any)
def get_job_post_info(browser, lock):
    dict_to_return = {}

    pg_source = browser.page_source
    soup = BeautifulSoup(pg_source, 'html.parser')
    # creating the soup

    job_post_id = soup.find('h1', text = re.compile('Job ID')).get_text()
    job_post_id = re.search('[0-9]{6}', job_post_id)[0]
    company = soup.find('div', class_="orbisModuleHeader").find('h5').get_text().strip()
    dict_to_return.update({"posting_id": job_post_id})
    dict_to_return.update({"company_name": company})
    # finding the id and the company name

    table = soup.find(id='postingDiv')
    overview = table.contents[1].find('tbody')
    app_info = table.contents[3].find('tbody')
    # finding the overview and app_info tables

    overview_dict = {}
    overview_categories = [
        'Work Term',
        'Job Title',
        'Level', 
        'Job - City',
        'Job - Province / State', 
        'Job - Country',
        'Work Term Duration',
        'Required Skills'
    ]

    # for now
    #overview_categories.pop(-1)

    for each in overview_categories:
        info = overview.find('strong', text = re.compile(each))
        if info != None:
            info = info.parent.find_next_sibling('td').get_text().strip()
        else:
            overview_dict.update({each: "Not Indicated"})
            continue
        if each == 'Work Term Duration':
            info = info[:7]
        overview_dict.update({each: info})
    
    #print(overview_dict) 
    # constructing the overview dictionary (will be assembled) 

    app_dict = {}
    app_categories = ["Application Deadline", "Application Documents Required"]
    for each in app_categories:
        try:
            info = app_info.find('strong', text = re.compile(each)).parent.find_next_sibling('td').get_text().strip()
            if each == 'Application Documents Required':
                info = info.split(',')
                for i in info:
                    if i.lower() == "cover letter":
                        app_dict.update({'Cover Letter': 'true'})
                        break
                    app_dict.update({'Cover Letter': 'false'})
            app_dict.update({each: info})
        except:
            app_dict.update({each: "None"})
            print("parent not found")
            print(dict_to_return["posting_id"])
            continue
    #print(app_dict)
    # constructing the app dictionary (will be assembled)

    nav = -1
    nav = browser.find_element_by_css_selector('ul.nav.nav-pills').find_elements_by_tag_name('a')[-1]
    # hard-coded nav idk if it'll work
    # trying to find the button to work term report

    if nav != -1:
        nav.click()
        browser.switch_to.window(browser.window_handles[1])
        work_term_dict = work_term_rating_parser(browser)

    else:
        pass
        print("nav could not be found")
    
    dict_to_return.update({"overview": overview_dict})
    dict_to_return.update({"app": app_dict})
    dict_to_return.update({"work_term_ratings": work_term_dict})
    #dict_to_return = str(json.dumps(dict_to_return))
    #return(dict_to_return)
    
    myclient = pymongo.MongoClient("mongodb+srv://3221385021:ggg666777888@cluster0-6mmei.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["job_system"]
    mycol = mydb["postings"]
    
    temp_time = dict_to_return["app"]["Application Deadline"].split()
    seconds_left = count_time(temp_time)


    temp = mycol.find_one({"posting_id": dict_to_return["posting_id"]})
    if temp is None:
        temp_time = dict_to_return["app"]["Application Deadline"].split()
        seconds_left = count_time(temp_time)
        if seconds_left < 0: #change it to >
            mycol.create_index([("time", pymongo.ASCENDING)], expireAfterSeconds=0)
            dict_to_return.update({"time": seconds_left})
            inserted = mycol.insert_one(dict_to_return)
            print(inserted.inserted_id)
        else:
            print("Already expired")
    else:
        print("Already existed")
        print(dict_to_return["posting_id"])

    '''
    lock.acquire()
    print(dict_to_return, end="_!_")
    lock.release()
    '''

'''
tried:
- directly parsing using bs4
- directly finding web element using selenium
- using selenium explicit wait (tried and failed; didn't get the gist)
- using time.sleep
- (found out that bs4 was parsing a loading bar all the time)
- using selenium explicit wait, and then get page source to parse in bs4
    (bs4 will always produce the waiting bar since it doesn't mimic user behaviour?)
- using selenium explicit wait again
'''

def work_term_rating_parser(webdriver):
    # organize the order:
    # 1. check if there's no data to display
    # 2. then parse the data we need
    try: 
        thing = WebDriverWait(webdriver, 5).until(
            EC.presence_of_element_located((By.CLASS_NAME, "highcharts-container"))
        )
    except:
        pass
        # try finding the alert of no data to display here
        #print("timed out :(")
    else:
        good_stuff = {} # <- the useful dictionary
        thing2 = webdriver.find_elements_by_class_name("highcharts-container")
        for each_thing in thing2: 
            title = each_thing.find_element_by_class_name("highcharts-title").find_element_by_tag_name("tspan").text
            if "by Student Work Term Number" in title:
                by_work_term = {} # <- the useful dictionary
                data_list = each_thing.find_element_by_class_name("highcharts-data-labels.highcharts-tracker").\
                find_elements_by_tag_name("text")
                for each_thing in data_list:
                    pair = each_thing.find_elements_by_tag_name("tspan")
                    # when the browser isn't fast enough, the tspan elements' text
                    # will be read before it even got the chance to load;
                    # therefore implemented a while loop that waits a bit till non-empty results are found
                    # (can improve this by changing it into a definitely ending loop)
                    while (pair[0].text == '' or pair[1].text == ''):
                        time.sleep(0.00001)
                        pair = each_thing.find_elements_by_tag_name("tspan")
                    # ↑ end of failsafe
                    by_work_term.update({pair[0].text: int(pair[1].text[2:-1])})
                    good_stuff.update({"by_work_term": by_work_term})
            
            if "Most Frequently Hired Programs" in title:
                by_program = {} # <- the useful dictionary
                # _(:з」∠)_
                programs = []
                programs_elements = each_thing.find_element_by_class_name("highcharts-axis-labels.highcharts-xaxis-labels").\
                find_elements_by_tag_name("text")
                for each_program in programs_elements:
                    try:
                        program_name = each_program.find_element_by_tag_name("tspan").text
                        programs.append(program_name)
                    except:
                        program_name = each_program.text
                        programs.append(program_name)
                # _(:з」∠)_
                entries = []
                entries_elements = each_thing.find_element_by_class_name("highcharts-data-labels.highcharts-tracker").\
                find_elements_by_tag_name("text")
                for element in entries_elements:
                    entry = int(element.find_element_by_tag_name("tspan").text)
                    entries.append(entry)
                by_program = {programs[i]: entries[i] for i in range(min(len(entries), len(programs)))}
                good_stuff.update({"by_program": by_program})
        #good_stuff = str(good_stuff).replace("'", '"')                
        #print(good_stuff)
        return good_stuff
    

'''
# ===================== web scraping testing ============================
driver = get_driver()
driver = connect_to_base(driver)
driver = get_source(driver)

things = driver.find_element_by_id("posting156914").\
find_elements_by_class_name("orgDivTitleMaxWidth")
# id = 156939 for example with no work term ratings
for thing in things:
    try:
        thing = thing.find_element_by_css_selector("a[onclick*='buildForm']")
        break
    except:
        print("_(:з」∠)_")
thing.click()
thing_before = driver.window_handles[0]
thing_after = driver.window_handles[1]
driver.switch_to.window(driver.window_handles[1])
#print(driver.page_source)
t0 = time.time()
stuff = get_job_post_info(driver)
print("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"*2)
print(stuff)
t1 = time.time() - t0
print(f"total time spent: {t1}")
#print(f'stuff is of type {type(stuff)}; \n{stuff}')
#driver.quit()
'''
