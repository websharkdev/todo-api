import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { pinoLogger } from "@/middlewares";

import type { AppBindings } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}
function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon("🧑‍💻"));
  // ERRORS
  app.notFound(notFound);
  app.onError(onError);
  // ERRORS
  // ----
  // LOGGER
  app.use(pinoLogger());
  // LOGGER

  return app;
}

export default createApp;
