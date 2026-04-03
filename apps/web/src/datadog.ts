import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';

export function initDatadog(): void {
  const applicationId = import.meta.env.VITE_DD_APPLICATION_ID;
  const clientToken = import.meta.env.VITE_DD_CLIENT_TOKEN;
  if (!applicationId || !clientToken) return;

  datadogRum.init({
    applicationId,
    clientToken,
    site: import.meta.env.VITE_DD_SITE ?? 'ap1.datadoghq.com',
    service: import.meta.env.VITE_DD_SERVICE ?? 'ktlbd-website-app',
    env: import.meta.env.VITE_DD_ENV ?? import.meta.env.MODE,
    version: import.meta.env.VITE_APP_VERSION ?? '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,
    plugins: [reactPlugin({ router: false })],
  });
}
