const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo",{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>console.log("Connected to DB here!! "))
.catch((error) => console.error("Database connection failed!", error));


const Todo = require('./models/todo');
app.get("/todos", async(req, res)=>{
    const todos = await Todo.find();
    res.json(todos);
})

app.post("/todos/new" ,async(req,res)=>{


    const { text } = req.body;
    if (!text || text.trim() === '') {
        return;
        }
    else
    {

        const todo = new Todo({
            text:req.body.text
        });

    todo.save();
    const todos = await Todo.find();
    res.json(todos);
    }
})

app.delete('/todos/delete/:uid', async(req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.uid);
    res.json(result);

})

app.get('/todos/completed/:uid', async(req,res)=>{
    const result = await Todo.findById(req.params.uid);
    result.complete = !result.complete;
    result.save();
    res.json(result);

})

app.listen(3000,()=> console.log("Server is stated at on 3002"));