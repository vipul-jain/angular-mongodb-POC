
// config express & mongodb
var express = require("express");
var mongo = require('mongodb');
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var app=express();


var server = new Server('localhost', 27017, { auto_reconnect: true });
db = new Db('samajseva', server);


//open connection of db

db.open(function(err,db){
	if(!err)
	{
		console.log(" connected to 'samajseva' db");
		
		db.collection('admin',{strict:true},function (err,collection)
							{
								if(err)
								{
									console.log("The 'samajseva' collection unavilable..!");
								}
							}
        );
	}
});

exports.adminlogin = function (req, res) {
    var adminRecord = req.body;

    db.collection('admin', function (err, collection) {
        collection.find(adminRecord).toArray(function(err, result) {
            if (err) {
                res.send({ 'IsSuccess' : false, 'msg': 'An error has occurred' });
            } else {
                //console.log('Success: ' + JSON.stringify(result[0]));
                res.send({ 'IsSuccess' : true, 'data': result });
                console.log("Fetched Records");
            }
        });
    });
}


exports.memberlogin = function (req, res) {
    var memberRecord = req.body;

    db.collection('memberlogin', function (err, collection) {
        collection.find(memberRecord).toArray(function(err, result) {
            if (err) {
                res.send({ 'IsSuccess' : false, 'msg': 'An error has occurred' });
            } else {
                //console.log('Success: ' + JSON.stringify(result[0]));
                res.send({ 'IsSuccess' : true, 'data': result });
                console.log("Fetched Records");
            }
        });
    });
}


exports.memberInsert = function (req, res) {
    var memberRecord = req.body;
    db.collection('member', function (err, collection) {
        collection.insert(memberRecord, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'IsSuccess' : false, 'msg': 'An error has occurred' });
            } else {
                //console.log('Success: ' + JSON.stringify(result[0]));
                res.send({ 'IsSuccess' : true});
                //res.send(docs);
                console.log("Fetched Records");
            }
        });
    });
}

exports.autogeneratepassword = function (req, res) {
    var autopasswordRecord = req.body;
    db.collection('memberlogin', function (err, collection) {
        collection.insert(autopasswordRecord, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'IsSuccess' : false, 'msg': 'An error has occurred' });
            } else {
                //console.log('Success: ' + JSON.stringify(result[0]));
                res.send({ 'IsSuccess' : true});
                //res.send(docs);
                console.log("Fetched Records");
            }
        });
    });
}





exports.getmemberbyformno = function (req, res) {
    var memberRecord = req.body;

    db.collection('member', function (err, collection) {
        collection.find(memberRecord).toArray(function(err, result) {
            if (err) {
                res.send({ 'IsSuccess' : false, 'msg': 'An error has occurred' });
            } else {
                //console.log('Success: ' + JSON.stringify(result[0]));
                res.send({ 'IsSuccess' : true, 'data': result });
                console.log("Fetched Records");
            }
        });
    });
}

exports.memberUpdate = function (req, res) {
    var memberRecord = req.body;
    console.log(memberRecord);
    db.collection('member', function (err, collection) {
        collection.update({formno:memberRecord.formno},
                {$set:{surname:memberRecord.surname,
                    name:memberRecord.name ,
                    fathername:memberRecord.fathername,
                    resaddress:memberRecord.resaddress,
                    resphno:memberRecord.resphno,
                    offaddress:memberRecord.offaddress,
                    offphno:memberRecord.offphno,
                    fax:memberRecord.fax,
                    business:memberRecord.business,
                    website:memberRecord.website,
                    email:memberRecord.email,
                    vilagerescaddress:memberRecord.vilagerescaddress,
                    vilagepincode:memberRecord.vilagepincode,
                    vilagephno:memberRecord.vilagephno,
                    vilagemobile:memberRecord.vilagemobile,
                    contacts:memberRecord.contacts,
                    familymembers:memberRecord.familymembers
                }},
                {upsert:true, w: 1}, function(err, result) {
            if (err) {
                console.log(err);
                res.send({ 'IsSuccess' : false, 'msg': 'An error has occurred' });
            } else {
                res.send({ 'IsSuccess' : true});

            }
        });
    });
}




    //db.member.find({ contacts : { $elemMatch : {sno : 1}}})
    //http://docs.mongodb.org/manual/reference/sql-comparison/
    //http://blog.michaelckennedy.net/2010/04/29/mongodb-vs-sql-server-2008-performance-showdown/
    //http://blog.michaelckennedy.net/2010/04/22/the-nosql-movement-linq-and-mongodb-oh-my/
    //https://github.com/angular-app/angular-app



