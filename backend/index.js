const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const DBSOURCE = path.join(__dirname,'db.sqlite')
const db = new sqlite3.Database(DBSOURCE, (err)=>{ if(err) console.error(err); else {
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)`)
  db.run(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, userId INTEGER, title TEXT, done INTEGER DEFAULT 0)`)
  // create a demo user
  const pwd = bcrypt.hashSync('senha',8)
  db.run('INSERT OR IGNORE INTO users (id,email,password) VALUES (1, "demo@demo.com", ?)',[pwd])
}})

const SECRET = 'devsecret'

// auth
app.post('/api/auth/login',(req,res)=>{
  const {email,password} = req.body
  if(!email || !password) return res.status(400).json({message:'email/password required'})
  db.get('SELECT * FROM users WHERE email = ?', [email], (err,row)=>{
    if(err) return res.status(500).json({message:'db error'})
    if(!row) return res.status(401).json({message:'invalid'})
    if(!bcrypt.compareSync(password, row.password)) return res.status(401).json({message:'invalid'})
    const token = jwt.sign({id:row.id,email:row.email}, SECRET, {expiresIn:'8h'})
    res.json({token})
  })
})

// register
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body
  if(!email || !password) return res.status(400).json({message:'email/password required'})
  const pwd = bcrypt.hashSync(password, 8)
  db.run('INSERT INTO users (email,password) VALUES (?,?)', [email, pwd], function(err){
    if(err){
      if(err.message && err.message.includes('UNIQUE')) return res.status(400).json({message:'email exists'})
      return res.status(500).json({message:'db error'})
    }
    const id = this.lastID
    const token = jwt.sign({id:id,email:email}, SECRET, {expiresIn:'8h'})
    res.json({token})
  })
})

// get current user
app.get('/api/me', auth, (req, res) => {
  db.get('SELECT id,email FROM users WHERE id=?', [req.user.id], (err,row)=>{
    if(err || !row) return res.status(404).json({message:'not found'})
    res.json({id:row.id,email:row.email})
  })
})



// middleware
function auth(req,res,next){
  const token = req.headers.authorization
  if(!token) return res.status(401).json({message:'no token'})
  try{
    const data = jwt.verify(token, SECRET)
    req.user = data
    next()
  }catch(e){ return res.status(401).json({message:'invalid token'}) }
}

// tasks
app.get('/api/tasks', auth, (req,res)=>{
  db.all('SELECT id,title,done FROM tasks WHERE userId = ?', [req.user.id], (err, rows)=> {
    if(err) return res.status(500).json([])
    res.json(rows.map(r=>({id:r.id,title:r.title,done:!!r.done})))
  })
})

app.post('/api/tasks', auth, (req,res)=>{
  const {title} = req.body
  db.run('INSERT INTO tasks (userId,title) VALUES (?,?)',[req.user.id,title], function(err){
    if(err) return res.status(500).json({message:'db error'})
    res.json({id:this.lastID})
  })
})

app.patch('/api/tasks/:id/toggle', auth, (req,res)=>{
  const id = req.params.id
  db.get('SELECT done FROM tasks WHERE id=? AND userId=?',[id,req.user.id],(err,row)=>{
    if(err || !row) return res.status(404).json({message:'not found'})
    const nd = row.done ? 0 : 1
    db.run('UPDATE tasks SET done=? WHERE id=?',[nd,id], function(err){
      if(err) return res.status(500).json({message:'db error'})
      res.json({ok:true})
    })
  })
})

app.delete('/api/tasks/:id', auth, (req,res)=>{
  db.run('DELETE FROM tasks WHERE id=? AND userId=?',[req.params.id, req.user.id], function(err){
    if(err) return res.status(500).json({message:'db error'})
    res.json({ok:true})
  })
})

app.listen(4000, ()=> console.log('API listening on 4000'))