const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const notifyRoutes = require("./routes/notifyRoutes");
const { connectKafkaProducer } = require("./configuration/kafkaService");
const { startScheduler } = require("./configuration/scheduler");

dotenv.config();

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Kafka and Scheduler
connectKafkaProducer();
startScheduler();

app.use("/api/notify", notifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
