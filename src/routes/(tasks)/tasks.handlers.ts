import { AppRouteHandlrer } from "@/lib/types";
import { ListRoute } from "./tasks.routes";

export const list: AppRouteHandlrer<ListRoute> = (c) => {
    return c.json([
        {
            name: 'Learn Hono',
            done: false
        },
    ])
}