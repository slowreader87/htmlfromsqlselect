This 'microsite' should allow users to generate a formatted HTML table from a SQL Select query on a MS SQL server, given the correct connection details and query objects.

It makes use of the excellent NPM package mssql as well as express and body-parser.

To install it install Nodejs > clone this repo > cd into it and type "npm i"

Once all packages have been installed run the app using "node app.js" and point your browser to 'http://localhost:3009" to begin querying MSSQL databases on your network

Basic CSS styling for the table is embedded within the table_template.html file.

Finally, the options parameter can be used to modify your SQL query with where clauses or order by etc.

Let me know if you find this useful!

charlie afif at g mail dot com