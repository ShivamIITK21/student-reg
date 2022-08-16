const expresss = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = expresss()

app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/studentDB')

const studentSchema = new mongoose.Schema({
    name:String,
    rollno: String,
    branch:String,
    userid:String
})

const Student = mongoose.model('Student', studentSchema)

app.get('/students', (req, res) => {
    const filters = req.query

    const query = {}
    if(filters.name !== undefined){
        query.name = {$regex: filters.name}
    }
    if(filters.rollno !== undefined){
        query.rollno = {$regex: filters.rollno}
    }
    if(filters.branch !== undefined){
        query.branch = {$regex: filters.branch}
    }
    if(filters.userid !== undefined){
        query.userid = {$regex: filters.userid}
    }

        Student.find(query, (err, foundStudents) => {
            if(!err){
                res.send(foundStudents)
            }
            else{
                res.send(err)
            }
        })
})

app.delete('/students', (req, res) => {
    Student.deleteMany({}, (err) => {
        if(!err){
            res.send('Deleted All')
        }
        else{
            res.send('Delete Failed')
        }
    })
})

app.delete('/students/:rollnum', (req, res) => {
    Student.deleteMany({rollno : {$in: req.params.rollnum}}, (err) => {
        if(!err){
            res.send(`Deleted ${req.params.rollnum}`)
        }
        else{
            res.send(`Failed to delete ${req.params.rollnum}`)
        }
    })
})

app.post('/students', (req, res) => {
    newStudent = new Student({
        name:req.body.name,
        rollno:req.body.rollno,
        branch:req.body.branch,
        userid:req.body.userid
    })
    newStudent.save()
    res.send('Saved')
})

app.put('/students/:rollno', (req, res) => {
    Student.updateOne({rollno: {$in :req.params.rollno}},
        {name: req.body.name, rollno:req.body.rollno, branch:req.body.branch, userid:req.body.userid}, (err) => {
            if(!err){
                res.send('Updated Successfully');
            }
            else{
                res.send(err)
            }
        })
})



app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000')
})