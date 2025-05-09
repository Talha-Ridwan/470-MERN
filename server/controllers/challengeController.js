import UserChallenge from "../models/userChallenge.js";
import DailyTask from "../models/dailyTask.js";

export const startChallenge = async (req, res) => {
    const duration = Number(req.body.duration);
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (isNaN(duration) || (duration !== 3 && duration !== 7)) {
        return res.status(400).json({ message: "Invalid duration" });
    }

    try {
        const existingChallenge = await UserChallenge.findOne({ userId, status: 'ongoing' });
        if (existingChallenge) {
            return res.status(400).json({ message: "You already have an ongoing challenge. Please cancel it first." });
        }

        const newChallenge = new UserChallenge({
            userId,
            duration,
            startDate: new Date(),
            progress: 0,
            status: 'ongoing'
        });

        await newChallenge.save();
        res.status(201).json({ message: "Challenge started successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCurrentChallenge = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const challenge = await UserChallenge.findOne({ userId }).sort({ startDate: -1 });

        if (!challenge || challenge.status === 'cancelled') {
            return res.status(200).json({ status: 'none' });
        }

        const startDate = new Date(challenge.startDate);
        const today = new Date();
        const timeDiff = today - startDate;
        const daysSinceStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const expectedDay = daysSinceStart + 1;
        const accessibleDay = Math.min(expectedDay, challenge.progress + 1);

        if (challenge.status === 'completed' || (accessibleDay > challenge.duration && challenge.progress >= challenge.duration)) {
            const allTasks = await DailyTask.find({ day: { $lte: challenge.duration } }).sort('day');
            const tasksWithStatus = allTasks.map(task => ({
                day: task.day,
                tasks: task.tasks,
                isCompleted: task.day <= challenge.progress
            }));
            return res.status(200).json({
                status: 'completed',
                duration: challenge.duration,
                progress: challenge.progress,
                accessibleDay: null,
                tasks: tasksWithStatus
            });
        } else {
            const allTasks = await DailyTask.find({ day: { $lte: challenge.duration } }).sort('day');
            const tasksWithStatus = allTasks.map(task => ({
                day: task.day,
                tasks: task.tasks,
                isCompleted: task.day <= challenge.progress
            }));
            return res.status(200).json({
                status: 'ongoing',
                duration: challenge.duration,
                progress: challenge.progress,
                accessibleDay,
                tasks: tasksWithStatus
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
export const completeDay = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const challenge = await UserChallenge.findOne({ userId, status: 'ongoing' });

        if (!challenge) {
            return res.status(400).json({ message: "No ongoing challenge" });
        }

        if (challenge.progress >= challenge.duration) {
            return res.status(400).json({ message: "Challenge already completed" });
        }

        // Calculate accessibleDay
        const startDate = new Date(challenge.startDate);
        const today = new Date();
        const timeDiff = today - startDate;
        const daysSinceStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const expectedDay = daysSinceStart + 1;
        const accessibleDay = Math.min(expectedDay, challenge.progress + 1);

        if (accessibleDay > challenge.duration) {
            return res.status(400).json({ message: "Challenge already completed" });
        }

        // Increment progress
        challenge.progress += 1;
        if (challenge.progress >= challenge.duration) {
            challenge.status = 'completed';
        }
        await challenge.save();
        res.status(200).json({ message: "Day completed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const cancelChallenge = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const challenge = await UserChallenge.findOne({ userId, status: 'ongoing' });

        if (!challenge) {
            return res.status(400).json({ message: "No ongoing challenge to cancel" });
        }

        challenge.status = 'cancelled';
        await challenge.save();
        res.status(200).json({ message: "Challenge cancelled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const defaultTasks = {
    1: ["Task 1.1", "Task 1.2", "Task 1.3"],
    2: ["Task 2.1", "Task 2.2", "Task 2.3"],
    3: ["Task 3.1", "Task 3.2", "Task 3.3"],
    4: ["Task 4.1", "Task 4.2", "Task 4.3"],
    5: ["Task 5.1", "Task 5.2", "Task 5.3"],
    6: ["Task 6.1", "Task 6.2", "Task 6.3"],
    7: ["Task 7.1", "Task 7.2", "Task 7.3"],
  };
  
  export const populateTasks = async (req, res) => {
    try {
      for (let day = 1; day <= 7; day++) {
        const tasks = defaultTasks[day];
        // upsert: only insert if not exists
        await DailyTask.findOneAndUpdate(
          { day },
          { $setOnInsert: { day, tasks } },
          { upsert: true }
        );
      }
      return res.status(201).json({ message: "Tasks populated successfully" });
    } catch (error) {
      console.error("Populate error:", error);
      return res.status(500).json({ message: "Server error while populating tasks" });
    }
  };