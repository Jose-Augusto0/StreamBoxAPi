import { metrics } from '@opentelemetry/api'

export const meter = metrics.getMeter('streambox-api')

export const playbackStartedCounter = meter.createCounter(
  'playback_started_total',
  {
    description: 'Total de playbacks iniciados',
  }
)

export const playbackStatusCounter = meter.createCounter(
  'playback_status_changed_total',
  {
    description: 'Total de mudanças de status do playback',
  }
)
