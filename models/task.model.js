const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        require: true
    },
    createdAt: {
        type: String,
        require: true,
        default: Date.now()
    },
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: 'UserModel'
    },
    dependentOn : {
        type: Schema.Types.ObjectId,
        ref: 'TaskModel',
        default: null
    },
    priorityNo: {
        type: Number,
        require: true
    },
    deadline: {
        type: Date,
        require: true
    },
    deleteApproval: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "notDeleting"],
        default: "notDeleting"
    }
},{
    versionKey: false,
})

const TaskModel = mongoose.model('tasks', taskSchema);

module.exports = TaskModel;