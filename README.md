Getting Started
===============

Install [mongo DB] (http://www.mongodb.org/downloads) & open command prompt

Create Database 
===============
1. Create a database named 'samajseva' 
````
     use samajseva

     db.admin.save( {username:"admin",password="123"})
````     

2. This will create a database named samajseva with a colletion named admin having username as "admin" and password as "123"

3. More information regarding creation of database and collection can be found [here] (http://www.mkyong.com/mongodb/how-to-create-database-or-collection-in-mongodb/)

Express server configuration 
============================

1. Open node.js 
2. Make sure you have youe express server configured
````
     npm install express -g
````     

3. Then in node.js command prompt supply the path till app.js directory
````	
	CD ~\angular-mongodb-POC\

	node app.js
````

4. And if everything goes fine you will see the following message  
 ````

		================================================================================
		========
		=  Please ensure that you set the default write concern for the database by sett
		ing    =
		=   one of the options
			   =
		=
			   =
		=     w: (value of > -1 or the string 'majority'), where < 1 means
			   =
		=        no write acknowlegement
			   =
		=     journal: true/false, wait for flush to journal before acknowlegement
			   =
		=     fsync: true/false, wait for flush to file system before acknowlegement
			   =
		=
			   =
		=  For backward compatibility safe is still supported and
			   =
		=   allows values of [true | false | {j:true} | {w:n, wtimeout:n} | {fsync:true}
		]      =
		=   the default value is false which means the driver receives does not
			   =
		=   return the information of the success/error of the insert/update/remove
			   =
		=
			   =
		=   ex: new Db(new Server('localhost', 27017), {safe:false})
			   =
		=
			   =
		=   http://www.mongodb.org/display/DOCS/getLastError+Command
			   =
		=
			   =
		=  The default of no acknowlegement will change in the very near future
			   =
		=
			   =
		=  This message will disappear when the default safe is set on the driver Db
			   =
		================================================================================
		========
		Express server listening on port 3000
		 connected to 'samajseva' db


Run Application
===============
Once you get this message you can open in your browser [http://localhost:3000] (http://localhost:3000/)  and  there comes the index page, 
login in Admin panel with username "admin" and password "123"

== NOTE : Structure of application CRUD operations can be found [here] (http://www.phloxblog.in/single-page-application-angular-js-node-js-mongodb-mongojs-module/#.UgCZTjegu5s)
 