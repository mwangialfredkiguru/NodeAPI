class TaskInfoHandler{
    ReturnTaskList(){
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        const DBName = "NodeAPI";
        const CollectionName = "tasks";

        return new Promise((resolve, reject) => {
                MongoClient.connect(url, function(err, db) {
                    if (err) {
                        return reject(err);
                    }else{            
                        var dbo = db.db(DBName);
                        var collection = dbo.collection(CollectionName).find().toArray(); 
                        return resolve(collection);
                    }
                })
            })   
    }  
    PostTask(TaskName, TaskCategory, TaskDescription, DueDate, Status){
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        const DBName = "NodeAPI";
        const CollectionName = "tasks";

        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
            var query = { TaskName: TaskName, TaskCategory:TaskCategory, TaskDescription: TaskDescription, DueDate: DueDate, Status: Status};
                dbo.collection(CollectionName).insertOne(query, function(err, res)  {
                    if (err) throw err;
                    console.log("one document inserted");
                    db.close();
                });
        }); 
    }
    ReturnOneTask(TaskID){
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        const DBName = "NodeAPI";
        const CollectionName = "tasks";

        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
            var query = { firstname: FirstName, lastname: Lastname,Phone: Phone, email: Email, message: Message};
                dbo.collection(CollectionName).insertOne(query, function(err, res)  {
                    if (err) throw err;
                    console.log("one document inserted");
                    db.close();
                });
        }); 
    }
}
module.exports = TaskInfoHandler;