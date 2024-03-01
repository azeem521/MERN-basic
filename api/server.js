const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const Todo = require('./model/Todo')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/to_do_app",{
    // useNewUrlParcer:true,
    useUnifiedTopology:true
}).then(()=>console.log("connected to DB"))
.catch((e)=>console.log('error to connect',e));

app.get('/todo',async(req,res)=>{
    try {
        const todos = await Todo.find();
        res.json(todos)
    } catch (error) {
        console.log(error);
    }
})

app.post('/todo/new',(req,res)=>{
    const todo = new Todo({
        text:req.body.text
    })
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id',async(req,res)=>{
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        res.json(result)
    } catch (error) {
        console.log('Error to delete',error);
    }
})

app.put('/todo/complete/:id', async(req,res)=>{
  try {
    const todo =await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo)
  } catch (error) {
    console.log(error);
  }
})

app.listen(5000,()=>console.log('server is started at 5000'));