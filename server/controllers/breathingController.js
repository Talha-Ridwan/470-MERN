const sessions = {}; // In-memory session tracking

const START_TIMEOUT = 5000;
const EXHALE_TIMEOUT = 4000;
const END_TIMEOUT = 10000;

export function registerInhale(req, res) {
  const sessionId = req.body.sessionId;
  const now = Date.now();

  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      startTime: now,
      lastClick: now,
      count: 1,
      feedback: [],
    };
    return res.json({ message: "Session started. Good first inhale!" });
  }

  const session = sessions[sessionId];
  const timeSinceLast = now - session.lastClick;
  session.lastClick = now;
  session.count++;

  let feedback = "";
  if (timeSinceLast > EXHALE_TIMEOUT) {
    feedback = "Great control. Keep the rhythm steady.";
  } else if (timeSinceLast < 1000) {
    feedback = "Try to slow down a little.";
  } else {
    feedback = "Nice pace.";
  }

  session.feedback.push({ time: now, feedback });

  res.json({ feedback, count: session.count });
}

export function checkStatus(req, res) {
  const sessionId = req.query.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.json({ status: "not_started" });
  }

  const now = Date.now();
  const timeSinceLast = now - session.lastClick;

  if (timeSinceLast > END_TIMEOUT) {
    delete sessions[sessionId];
    return res.json({ status: "ended", message: "Session ended due to inactivity." });
  }

  if (timeSinceLast > EXHALE_TIMEOUT) {
    return res.json({ status: "exhaling", message: "You're in exhale phase." });
  }

  res.json({ status: "active", message: "Session ongoing." });
}
