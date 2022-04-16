const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
// body parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.use(async function(req,res,next) {

    let { Low,JSONFile } = await import('lowdb')
    let db = new Low(new JSONFile('./base/db.json'))
    req.db = db
    next()

})

app.post('/api/deleteproject',async function(req,res) {

    let project_name = req.body.project_name
    let db = req.db
    let index
    await db.read()
    db.data.projects.forEach((project,ind) => {
        if(project_name === project.project_name) {
            index = ind
        }
    })

    db.data.projects.splice(index,1)
    db.write()

    res.json({
        result: 'success'
    })

})

app.post('/api/updateproject',async function(req,res) {
    
    let project_name = req.body.project_name
    let tasks = req.body.tasks
    let db = req.db

    await db.read()
    let project = db.data.projects.filter(project  => project_name === project.project_name)
    project = project[0]
    project.tasks.forEach((task,ind) => {
        task.complete_status = tasks[ind].complete_status
    });
    db.write()

    res.send({
        result: 'success'
    })

})

app.get('/api/allprojects',async function(req,res) {

    let db = req.db
    await db.read()

    let projects = db.data.projects

    res.json({
        projects: projects
    })
    
})

app.post('/api/newproject',async function(req,res) {
    
    let db = req.db
    await db.read()

    let name = req.body.project_name
    let tasks = req.body.tasks

    db.data.projects.push({
        project_name: name,
        tasks: tasks
    })
    db.write()

    res.json({
        result: 'success'
    })
})

app.get('/',function(req,res) {
    res.send('hey')
})


app.listen(8080,() => console.log('listening'))