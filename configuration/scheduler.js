const Notification = require("../common/notificationModel");

const startScheduler = () => {
  setInterval(async () => {
    const pendingNotifications = await Notification.find({ status: "pending" });

    pendingNotifications.forEach(async (notification) => {
      if (!notification.send_time || new Date() >= notification.send_time) {
        console.log(`Delivering notification: ${notification.message}`);
        notification.status = "delivered";
        await notification.save();
      }
    });
  }, 60000); // Check every minute
};

module.exports = { startScheduler };
