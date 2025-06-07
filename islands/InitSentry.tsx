import { useEffect } from "preact/hooks";
import * as Sentry from "npm:@sentry/react";

export default function SentryInit(
  props: { dsn: string; env: string },
) {
  useEffect(() => {
    Sentry.init({
      dsn: props.dsn,
      environment: props.env,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
        Sentry.browserSessionIntegration(),
      ],
      tracesSampleRate: props.env === "development" ? 1.0 : 0.2,
      sendDefaultPii: true,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }, []);
  return null;
}
