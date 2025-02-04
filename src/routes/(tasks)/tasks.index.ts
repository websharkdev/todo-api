import { createRouter } from "@/lib/create-app";
import * as handlers from './tasks.handlers';
import * as routes from './tasks.routes';


const tasks = createRouter().openapi(routes.list, handlers.list).openapi(routes.create, handlers.create).openapi(routes.getItem, handlers.getItem).openapi(routes.patch, handlers.patch)

export default tasks