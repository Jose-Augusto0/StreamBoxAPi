import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'playback-service',
  brokers: ['localhost:9092'], 
})

export const producer = kafka.producer()

export async function connectProducer() {
  await producer.connect()
  console.log('Kafka conectado')
}
