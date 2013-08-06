
//  Configuring global variables used on server side
var express = require('express'),
CRUDOper = require('./routes/CRUDOper');
   

var app = module.exports = express();
 //Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
   app.use(express.static(__dirname + '/views'));
   app.use(express.logger('dev'));
  app.use(app.router);
  app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendfile(__dirname + '/views/index.html');
});
  });

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

//  Used for Admin Login purpose Called from LoginController
app.post('/CRUDOper/adminlogin', CRUDOper.adminlogin);

//  Used for Member Login purpose Called from LoginController
app.post('/CRUDOper/memberlogin', CRUDOper.memberlogin);

//  Used for Member Insert purpose Called from FormController
app.post('/CRUDOper/memberInsert', CRUDOper.memberInsert);

//  Used for AutoGenerating password insert into database Called from FormController when memberInsert is successful
app.post('/CRUDOper/autogeneratepassword', CRUDOper.autogeneratepassword);

//  Used for Getting Member Information based on formNo as unique value Called from FormController
app.post('/CRUDOper/getmemberbyformno', CRUDOper.getmemberbyformno);

//  Used for Member Update purpose Called from FormController
app.post('/CRUDOper/memberUpdate', CRUDOper.memberUpdate);



// Start server

app.listen(3000, function(){
  console.log("Express server listening on port 3000");
});
 