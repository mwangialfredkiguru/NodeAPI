'use strict';
const UserProfile = require('../controller/UserProfile');
const UserInfo = new UserProfile();
const TaskInfoHandler = require('../controller/TaskController');
const TaskInfo = new TaskInfoHandler();

var moment = require('moment');
var express = require('express');
var router = express.Router();

const BaseURL = "/api/v1";

/* GET users listing. */
router.get(BaseURL+'/users', function (req, res) {
    UserInfo.ReturnUserList().then(function(value) {
        res.status(200).json
        ({
            Status: '200.0.1',
            Message: 'Successfully excecuted',
            Data: value
        });   
      })    
      .catch(function(err) {    
        console.log(err);    
        res.status(404).send(err);
      }); 
});
/* Register users */
router.post(BaseURL+'/users', function (req, res) {
    const Name = req.body.Name
    const Email = req.body.Email
    const PhoneNo = req.body.PhoneNo
    const Password = req.body.Password
    const DueDate = moment().format('yyyy-mm-dd hh:mm:ss');
    const Status = "0"
    UserInfo.DoNewUserRegistration(Name, Email, PhoneNo, Password, DueDate, Status);    
    res.status(200).json
        ({
            Status: '200.0.1',
            Message: 'Successfully excecuted'
        });  
});
//Do Login
router.post(BaseURL+'/Auth/users', function (req, res) {
    const Email = req.body.Email
    const Password = req.body.Password
    console.log(req.body);
    if(Email != null || Password != null){
        UserInfo.DoLogin(Email, Password).then(function(value) {
            //console.log(value);
            if(value != null){
                res.status(200).json
                ({
                    Status: '200.0.1',
                    Message: 'Successfully logged in',
                    Data: value
                }); 
                }else{
                    res.status(200).json
                ({
                    Status: '200.0.1',
                    Message: 'Invalid Credentials',
                    Data: value
                }); 
            }          
          })    
          .catch(function(err) {    
            console.log(err);    
            res.status(404).send(err);
          });  
    }else{
        res.status(200).json
        ({
            Status: '200.0.1',
            Message: 'Please enter credentials.'
        }); 
    }
});
     
/* GET Tasks. */
router.get(BaseURL+'/tasks', function (req, res) {
    //Use Promises to Display
    TaskInfo.ReturnTaskList().then(function(value) {
        res.status(200).json
        ({
            Status: '200.0.1',
            Message: 'Successfully excecuted',
            Data: value
        });   
      })    
      .catch(function(err) {    
        console.log(err);    
        res.status(404).send(err);
      });        
});

router.post(BaseURL + '/tasks', function (req, res) {
    const TaskName = req.body.TaskName
    const TaskCategory = req.body.TaskCategory
    const TaskDescription = req.body.TaskDescription
    const DueDate = req.body.DueDate
    const Status = req.body.Status
    TaskInfo.PostTask(TaskName, TaskCategory, TaskDescription, DueDate, Status);    
    res.send('respond with a resource');
});

module.exports = router;