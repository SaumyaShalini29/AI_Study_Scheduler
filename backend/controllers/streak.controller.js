import Streak from "../models/streak.model.js";

export const updateStreak = async (req, res) => {
  const { userId } = req.body;

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  let streak = await Streak.findOne({ userId });

  if (!streak) {
    streak = new Streak({ userId, count: 1, lastDate: today });
    await streak.save();
    return res.json({ streak: 1 });
  }

  if (streak.lastDate === today) {
    return res.json({ streak: streak.count }); // already updated today
  }

  if (streak.lastDate === yesterday) {
    streak.count += 1;
  } else {
    streak.count = 1;
  }

  streak.lastDate = today;
  await streak.save();

  res.json({ streak: streak.count });
};
