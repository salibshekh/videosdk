const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-app",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka Producer Connected");
  } catch (err) {
    console.error("Kafka Producer Error:", err);
  }
};

const sendToKafka = async (notification) => {
  try {
    await producer.send({
      topic: "notifications",
      messages: [{ value: JSON.stringify(notification) }],
    });
  } catch (err) {
    console.error("Error sending to Kafka:", err);
  }
};

module.exports = { connectKafkaProducer, sendToKafka };
