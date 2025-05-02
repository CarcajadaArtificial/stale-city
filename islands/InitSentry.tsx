import { useEffect } from "preact/hooks";
import * as Sentry from "npm:@sentry/browser";

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
    });
  }, []);
  return null;
}
