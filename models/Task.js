const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [20, "Name can not be more than 20 characters"],
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("Task", TaskSchema, "Tasks");