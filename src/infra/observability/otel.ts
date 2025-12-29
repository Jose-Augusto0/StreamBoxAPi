import { NodeSDK } from '@opentelemetry/sdk-node'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

const prometheusExporter = new PrometheusExporter({
  port: 9464,
  endpoint: '/metrics',
})

const sdk = new NodeSDK({
  metricReader: prometheusExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: 'streambox-api',
})

sdk.start()

console.log('📊 Metrics em http://localhost:9464/metrics')
console.log('🧠 Traces: http://localhost:16686 (Jaeger)')
