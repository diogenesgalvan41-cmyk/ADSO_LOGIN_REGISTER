const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 3001
app.use(express.json()); 
//SELECT `id`, `email`, `passaword` FROM `usuarios` WHERE 1
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'death',
});

app.post('/login',async (req, res) => {
   const {email, password} = req.body
   const [rows] = await pool.promise().query('SELECT `id`, `email`, `password` FROM `usuarios` WHERE email = ? AND password = ?', [email, password]);
   if(rows.length > 0){
     res.send('Login success')
   } else {
     res.send('Login fail')
   }

}) 
app.post('/register',async (req, res) => {
  const {email, password} = req.body
  const [rows] = await pool.promise()
  .query('INSERT INTO `usuarios` (`email`, `password`) VALUES (?, ?)', 
    [email, password]);
    if  (rows.affectedRows > 0) {
      res.send('Registration success')
    }else {
      res.send('Registration fail')
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})