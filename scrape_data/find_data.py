import pymongo
import datetime
#myclient = pymongo.MongoClient("mongodb://localhost:27017/")
myclient = pymongo.MongoClient("mongodb+srv://3221385021:ggg666777888@cluster0-6mmei.mongodb.net/test?retryWrites=true&w=majority")

mydb = myclient["job_system"]
mycol = mydb["postings"]
#x = mycol.find_one({"posting_id": "155659"})
#x = mycol.delete_many({})
#print(x)
'''
for i in mycol.find():
    print(i)
    count = mycol.find({"posting_id": i["posting_id"]}).count()
    if count != 1:
        print(count)
'''
'''


for i in mycol.find():
    temp = i["app"]["Application Deadline"].split()
    print(temp) #['Mar', '11,', '2020', '09:00:00', 'AM']
    seconds_left = count_time(temp)
    print(seconds_left)
    #print(datetime.datetime.now())
    print()
    a += 1
    if (a == 10):
        break

'''


#mycol.drop()
'''
for i in range(10):
    mycol.create_index([("time", pymongo.ASCENDING)], expireAfterSeconds=0)
    #b = {str(i):str(i), "time": datetime.datetime.now()+ datetime.timedelta(seconds=10)}
    b = {str(i):str(i), "time": -10}
    mycol.insert_one(b)
    '''
    
# for i in mycol.find():#.sort('work_term_ratings.by_work_term.First', 1):
#     if i['work_term_ratings']: #and 'by_work_term' in i['work_term_ratings']:
#         print(i['work_term_ratings']['by_work_term'])
print("Activated")
print(mycol.find_one())
#print(mycol.find())
#mycol.insert_one({"name": "test"})

# for i in mycol.find():
#     print(i)

#print("count", mycol.count_documents({}))
