import json

#fake data
a = {"posting_id": "156607", 
    "company_name": "company1", 
    "overview": {
        "work_term": "Spring",
        "job_title": "Software Engineer",
        "level": "Grand Master",
        "city": "Toronto",
        "province": "Ontario",
        "country": "Canada",
        "work_term_duration": "4 month",
        "required_skills": "everything"}, 
    "app": {
        "application_deadline": "mar 11 9:00 AM",
        "application_documents": "Resume, Cover Letter",
        "need_cover": "yes"}, 
    "work_term_ratings": "empty"
    }

b = {"posting_id": "99999", 
    "company_name": "company1", 
    "overview": {
        "work_term": "Spring",
        "job_title": "Software Engineer",
        "level": "Grand Master",
        "city": "Toronto",
        "province": "Ontario",
        "country": "Canada",
        "work_term_duration": "4 month",
        "required_skills": "everything"}, 
    "app": {
        "application_deadline": "mar 11 9:00 AM",
        "application_documents": "Resume, Cover Letter"}, 
    "work_term_ratings": "empty"
    }
c = {}
c.update({"posting_id": "12421"})
thing = {"posting_id": "157014", "company_name": "Ontario Ministry of Transportation - Geomatics Section", "overview": {"Work Term": "2020 - Spring", "Job Title": "Geomatics Plan Technician", "Level": "Junior", "Job - City": "Downsview", "Job - Province / State": "Ontario", "Job - Country": "Canada", "Work Term Duration": "4 month work term"}, "app": {"Application Deadline": "Mar 19, 2020 09:00:00 AM", "Application Documents Required": ["University of Waterloo Co-op Work History", "Cover Letter", "R\u00e9sum\u00e9", "Grade Report"]}, "work_term_ratings": {"by_work_term": {"First": 33, "Second": 20, "Third": 27, "Fourth": 7, "Fifth": 7, "Sixth +": 7}, "by_program": {"Geomatics": 6, "Environmental Engineering": 5, "Civil Engineering": 2, "Geography & Environmental": 2}}}
postings = [thing]
#a = str(json.dumps(a))
length = len(postings)
for i in range(length):
    postings[i] = str(json.dumps(postings[i]))
    print(postings[i],end="_!_")
