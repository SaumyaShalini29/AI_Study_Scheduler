export const getStudySuggestion 
 = (req, res) => {
  try {
    let { priority, difficulty, performance, studyTime } = req.body;
    performance = parseInt(performance, 10);

    if (!priority || !difficulty || isNaN(performance) || !studyTime) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    let baseDuration = 120;

    if (priority === 'High') baseDuration += 30;
    else if (priority === 'Low') baseDuration -= 20;

    if (difficulty === 'Hard') baseDuration += 40;
    else if (difficulty === 'Easy') baseDuration -= 20;

    if (performance > 90) baseDuration -= 30;
    else if (performance < 50) baseDuration += 30;

    if (studyTime === 'Afternoon') baseDuration -= 10;
    else if (studyTime === 'Night') baseDuration += 10;

    let idealSlot = '';
    if (studyTime === 'Morning') {
      idealSlot = performance > 70 ? '5:30 AM – 7:30 AM' : '6:00 AM – 8:00 AM';
    } else if (studyTime === 'Afternoon') {
      idealSlot = difficulty === 'Hard' ? '1:30 PM – 3:30 PM' : '2:00 PM – 4:00 PM';
    } else if (studyTime === 'Evening') {
      idealSlot = performance < 60 ? '5:00 PM – 7:00 PM' : '6:00 PM – 8:00 PM';
    } else {
      idealSlot = performance > 80 ? '9:00 PM – 11:00 PM' : '8:30 PM – 10:30 PM';
    }

    let breakAfter = baseDuration >= 180 ? 'Every 60 minutes' :
                     baseDuration >= 120 ? 'Every 50 minutes' : 'Every 40 minutes';

    let focusTip = (difficulty === 'Hard' && performance < 50) ?
      'Start with revision and explain topics aloud to yourself.' :
      (difficulty === 'Easy' && performance > 80) ?
      'Skim through notes and attempt mock tests.' :
      'Use the Pomodoro technique (25 min study + 5 min break).';

    let taskSuggestion = (priority === 'High' && difficulty === 'Hard') ?
      'Focus on problem-solving and revision of key formulas.' :
      (priority === 'Low' && performance > 90) ?
      'Light review or quick revision.' :
      'Revise class notes and attempt 2–3 practice problems.';

    console.log({ baseDuration, idealSlot, breakAfter, focusTip, taskSuggestion });

    return res.json({
      suggestedDuration: baseDuration,
      idealSlot,
      breakAfter,
      focusTip,
      taskSuggestion,
    });
  } catch (error) {
    console.error('Error calculating study suggestion:', error);
    return res.status(500).json({ error: 'Failed to calculate study suggestion' });
  }
};
