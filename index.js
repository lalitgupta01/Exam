const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()
const connection = mysql.createConnection({
    host : "localhost",
    user :"root",
    password :"manager",
    database :"btsdb", 
});

app.use(cors('*'))

app.use(express.json());


app.get('/', (request, responce) => { 
    query = `select * from emp`
    connection.query(query,(error,result)=>{
        if (error == null) {
            responce.setHeader("Content-Type", "application/json");
            responce.write(JSON.stringify(result));
            responce.end();
        }
        else {
            responce.setHeader("Content-Type", "application/json");
            responce.write(JSON.stringify(error));
            responce.end();
        }
   
    })
})
app.post('/',(request,responce)=>{
    var query= `insert into emp(name,email,password,emp_id,dname,doj) values('${request.body.name}','${request.body.email}','${request.body.password}',${request.body.emp_id},'${request.body.dname}','${request.body.doj}');`;
    connection.query(query, (error, result) => {
        if (error == null) {
                responce.setHeader("Content-Type", "application/json");
                responce.write(JSON.stringify(result));
                responce.end();
            }
            else {
                responce.setHeader("Content-Type", "application/json");
                responce.write(JSON.stringify(error));
                responce.end();
            }
        });
   
})

app.put('/:name',(request,responce)=>{

    var query= `update emp set dname='${request.body.dname}',doj='${request.body.doj}' where name='${request.params.name}';`;
    connection.query(query, (error, result) => {
        if (error == null) {
                responce.setHeader("Content-Type", "application/json");
                responce.write(JSON.stringify(result));
                responce.end();
            }
            else {
                responce.setHeader("Content-Type", "application/json");
                responce.write(JSON.stringify(error));
                responce.end();
            }
        });
   

})

app.delete('/:doj',(request,responce)=>{

    var query= `delete from emp where doj='${request.params.doj}'`;
    connection.query(query, (error, result) => {
        if (error == null) {
                responce.setHeader("Content-Type", "application/json");
                responce.write(JSON.stringify(result));
                responce.end();
            }
            else {
                responce.setHeader("Content-Type", "application/json");
                responce.write(JSON.stringify(error));
                responce.end();
            }
        });
   

})


app.listen(4000, '0.0.0.0', () => {
  console.log('server started on port 4000')
})
