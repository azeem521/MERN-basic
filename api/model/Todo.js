const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ToDoSchema = new schema({
    text:{
        type:String,
        require:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:String,
        default:Date.now()
    }
})
const todo = mongoose.model('Todo',ToDoSchema)
module.exports = todo