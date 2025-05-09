import mongoose from "mongoose";

const userChallengeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    duration: { type: Number, required: true }, // 3 or 7
    startDate: { type: Date, required: true },
    progress: { type: Number, default: 0 }, // number of days completed
    status: { type: String, enum: ['ongoing', 'completed', 'cancelled'], default: 'ongoing' }
});

const UserChallenge = mongoose.model('UserChallenge', userChallengeSchema);
export default UserChallenge;