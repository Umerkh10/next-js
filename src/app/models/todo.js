import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
export default Todo;