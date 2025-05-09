import mongoose from "mongoose";

const dailyTaskSchema = new mongoose.Schema({
    day: { type: Number, required: true, unique: true }, // 1 to 7
    tasks: [{ type: String }] // array of task descriptions
});

const DailyTask = mongoose.model('DailyTask', dailyTaskSchema);
export default DailyTask;