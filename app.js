const sql = require('mssql')
const fs = require('fs')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const runSql = require('./buildtablefromquery')

const app = express()
const port = 3009
const public = path.join(__dirname, 'public')

app.use(express.static(public))
app.use(bodyParser.urlencoded({extended: false}))

app.post('/submission', async (req, res, next) => {
    const {username, password, ip, database, object, rows, options} = req.body
    const html = await runSql(username, password, ip, database, object,rows, options)
    //res.sendFile(path.join(__dirname,'table.html'))
    res.send(html)
})

app.get('/', (req, res, next) =>{
    res.send('index')
})

app.listen(port, () => {
    console.log('server running on port ' + port)
})