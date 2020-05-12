import json

# new data
data = {
    _id: 5e829e61b239d07111e06876,
    posting_id: '157465',
    company_name: 'Upchain - Division Office',
    overview: {
      'Work Term': '2020 - Spring',
      'Job Title': 'Junior Product Manager',
      Level: 'Intermediate\n\n\nSenior',
      'Job - City': 'Toronto',
      'Job - Province / State': 'Ontario',
      'Job - Country': 'Canada',
      'Work Term Duration': '4 month work term'
    },
    app: {
      'Application Deadline': 'Apr 01, 2020 09:00:00 AM',
      'Cover Letter': 'false',
      'Application Documents Required': [Array]
    },
    work_term_ratings: null
  }


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
        "application_documents": "Resume, Cover Letter",
        "need_cover": "yes"}, 
    "work_term_ratings": "empty"
    }
c = {"by_work_term"}
c.update({"posting_id": "12421"})

postings = [a,b]
#a = str(json.dumps(a))
length = len(postings)
for i in range(length):
    postings[i] = str(json.dumps(postings[i]))
    if i != length - 1:
        print(postings[i], end="_!_")
    else:
        print(postings[i], end="")


# real data
thing = {
    'posting_id': '156914',
    'company_name': 'Bell Media - Head Office',
    'overview': {
        'Work Term': '2020 - Spring',
        'Job Title': 'Technical Account Coordinator', 
        'Level': 'Junior\n\n\nIntermediate', 
        'Job - City': 'Toronto', 
        'Job - Province / State': 'Ontario', 
        'Job - Country': 'Canada', 
        'Work Term Duration': '8 month consecutive work term required', 
        'Required Skills': 'Requirements:\n\nA keen interest in digital advertising (e.g. IAB) -\xa0preferred\nKnowledge of digital ad servers (DFP) and third party vendors -\xa0preferred\nUnderstanding of digital advertising tech (e.g. VAST, Javascript/HTML5 tags) -\xa0preferred\nMS Office, PowerPoint and Excel applications'
    }, 
    'app': {
        'Application Deadline': 'Mar 17, 2020 09:00:00 AM', 
        'Application Documents Required': [
            'University of Waterloo Co-op Work History',
            'Résumé',
            'Grade Report'
        ]
    }, 
    'work_term_ratings': {
        'by_work_term': {
            'First': 5, 
            'Second': 19, 
            'Third': 29, 
            'Fourth': 24, 
            'Fifth': 19, 
            'Sixth +': 5
        },
        'by_program': {
            'Economics': 3, 
            'Environment & Business': 3, 
            'Social Development Studies': 3, 
            'Chemistry': 2, 
            'Computing and Financial Management': 2, 
            'English': 2, 
            'Nanotechnology Engineering': 2, 
            'Science & Business': 2, 
            'Global Business & Digital Arts': 1, 
            'Physics': 1
        }
    }
}

