const Notification = require("../common/notificationModel");
const { sendToKafka } = require("../configuration/kafkaService");

exports.createNotification = async (req, res) => {
  try {
    const { message, send_time, priority, user_id } = req.body;

    const notification = new Notification({
      message,
      send_time,
      priority,
      user_id,
    });

    await notification.save();
    await sendToKafka(notification);

    res.status(200).json({ message: "Notification queued successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to queue notification." });
  }
};
