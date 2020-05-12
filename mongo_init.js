
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://3221385021:ggg666777888@job-posts-6mmei.gcp.mongodb.net/job_system";

class Post_db {
    constructor() {
        this.result = null;
    }
    // function to connect and call other functions, use callbacks

    
    insert_post (post) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var db_operation = db.db("job_system");
            db_operation.collection("postings").insertOne(post, function(err, res) {
                if (err) throw err;
                console.log("inserted successfully");
                db.close();
            });
        });
    }

    find_post (condition_obj) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                var db_operation = db.db("job_system");
                db_operation.collection("postings").find(condition_obj).toArray(function(err, res) {
                    if (err) throw err;
                    db.close();
                    return resolve(res);
                });
            });
        });
    }

    find_post_sort (condition_obj, sort_condition) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                var db_operation = db.db("job_system");
                db_operation.collection("postings").find(condition_obj).sort(sort_condition).toArray(function(err, res) {
                    if (err) throw err;
                    db.close();
                    return resolve(res);
                });
            });
        });
    }

    find_post_count (condition_obj) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                var db_operation = db.db("job_system");
                db_operation.collection("postings").find(condition_obj).count(function(err, res) {
                    if (err) throw err;
                    db.close();
                    return resolve(res);
                });
            });
        });
    }

    drop_table () {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var db_operation = db.db("job_system");
            db_operation.collection("postings").drop(function(err, res){
                if (err) throw err;
                console.log("deleted");
                db.close();
            });
        });
    }
}

module.exports = Post_db;

