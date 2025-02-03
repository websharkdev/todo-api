import { pinoLogger } from "@/middlewares";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { AppBindings } from "./types";


const createApp = () => {
  const app = new OpenAPIHono<AppBindings>({
    strict: false
  });
  app.use(serveEmojiFavicon("🧑‍💻"));
  // ERRORS
  app.notFound(notFound);
  app.onError(onError);
  // ERRORS
  // ----
  // LOGGER
  app.use(pinoLogger());
  // LOGGER

  return app 
}


export default createApp;
