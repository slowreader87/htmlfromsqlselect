const sql = require('mssql')
const fs = require('fs').promises
const path = require('path')

const runSql = async (username, password, ip, database, object, rows, filter) => {
  try {
      let query = ''
      if(filter){
          query = `select top ${rows} * from ${object} ${filter}`
      } else {
          query = `select top ${rows} * from ${object}`
      }

      let html = await fs.readFile(path.join(__dirname, 'table_template.html'), 'utf8')
      html += `<h2>Results as a Table for ${query}</h2>`

      await sql.connect(`mssql://${username}:${password}@${ip}/${database}`)
      const result = await sql.query(`select top ${rows} * from ${object} ${filter}`)
      const columnHeadersArr = Object.keys(result.recordset[0])
      const dataArray = result.recordset
      // create row start tag
      html += `<tr>`
      // create a th for each header in columnHeadersArr
      columnHeadersArr.forEach((header) => {
          html += `<th>${header}</th>`
      })
      // create row end tag for header row
      html += `</tr>`
      // double-loop for data cells - outside loop is tr indexed by row number, inside loop is tds, indexed by column header names
      dataArray.forEach((row, j, arr) => {
          html += `<tr>`
          columnHeadersArr.forEach((header) => {
              html += `<td>${dataArray[j][header]}</td>`
          })
          html += '</tr>'
      })
      // create table end tag
      html += `</table></body>`

      // option to write an html file of the results - so you can check it through, amend any styling and serve that up while testing

      // fs.writeFile('table.html', html, () => {
      //     console.log('html file written')
      // })

      // option to write a json file of the results - to help work through parsing issues. visual studio code 'format document' option is useful here

      // fs.writeFile('results.json', JSON.stringify(result.recordset), () => {
      //     console.log('json file written')
      // })
      return html

  } catch (err) {
      console.log(err)
  }
}

module.exports = runSql
