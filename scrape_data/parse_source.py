from bs4 import BeautifulSoup
import re

def get_posting_numbers(browser):
    source = browser.page_source
    source_soup = BeautifulSoup(source, "lxml")
    #raw_postings = source_soup.find_all('tr')
    # find numbers with a length of 6, which is a property owned by posting_id only
    raw_postings = source_soup.find_all('td', text = re.compile("\d{6}"))
    length = len(raw_postings)
    total_len = source_soup.find_all('span', class_= 'badge badge-info')
    for i in total_len:
        total_len = int(str(i.text).strip())
    # parse the beautiful soup object
    for i in range(length):
        raw_postings[i] = int(str(raw_postings[i])[4:-5])
        
    return [raw_postings, length, total_len]
