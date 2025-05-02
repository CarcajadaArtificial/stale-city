import { App, fsRoutes, staticFiles } from "fresh";
import * as Sentry from "npm:@sentry/deno";

Sentry.init({
  dsn: Deno.env.get("SENTRY_DSN"),
  environment: Deno.env.get("ENV"),
  integrations: [
    Sentry.getDefaultIntegrations,
  ],
  sendDefaultPii: true,
  tracesSampleRate: Deno.env.get("ENV") === "development" ? 1.0 : 0.2,
});

export const app = new App()
  .use(staticFiles())
  .use((ctx) => {
    console.log(`${ctx.req.method} ${ctx.req.url}`);
    return ctx.next();
  })
  .use(async (ctx) => {
    const { req } = ctx;
    const name = `${req.method} ${new URL(req.url).pathname}`;

    const span = Sentry.startInactiveSpan({
      name,
      op: "http.server",
      forceTransaction: true,
    });

    try {
      return await ctx.next();
    } catch (err) {
      Sentry.captureException(err);
      throw err;
    } finally {
      span.end();
    }
  });

await fsRoutes(app, {
  dir: "./",
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
