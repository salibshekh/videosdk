const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: String,
  send_time: Date,
  priority: String,
  user_id: String,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Notification", notificationSchema);
