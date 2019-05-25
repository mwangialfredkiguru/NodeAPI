class UserProfile{
    //Login
    DoLogin(Email, Password){
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        const DBName = "NodeAPI";
        const CollectionName = "user";

        return new Promise((resolve, reject) => {
                MongoClient.connect(url, function(err, db) {
                    if (err) {
                        return reject(err);
                    }else{            
                        var dbo = db.db(DBName);                        
                        var query = {Email: Email, Password: Password };
                        var collection = dbo.collection(CollectionName).find(query, {_id: 0}); 
                        //console.log(collection);
                        return resolve(collection);
                    }
                })
            })
    }

    //Register
    DoNewUserRegistration(Name, Email, PhoneNo, Password, DueDate, Status){
        var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            const DBName = "NodeAPI";
            const CollectionName = "user";
            MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DBName);
                var query = { Name: Name, Email:Email, PhoneNo: PhoneNo, Password: Password, DueDate: DueDate, Status: Status};
                    dbo.collection(CollectionName).insertOne(query, function(err, res)  {
                        if (err) throw err;
                        db.close();
                    });
            }); 
    }

    ReturnUserList(){
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        const DBName = "NodeAPI";
        const CollectionName = "user";

        return new Promise((resolve, reject) => {
                MongoClient.connect(url, function(err, db) {
                    if (err) {
                        return reject(err);
                    }else{            
                        var dbo = db.db(DBName);
                        var collection = dbo.collection(CollectionName).find({}, {_id:0}).toArray(); 
                        return resolve(collection);
                    }
                })
            })   
    }
}
module.exports = UserProfile;