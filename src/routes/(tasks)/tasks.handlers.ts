
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { AppRouteHandlrer } from "@/lib/types";
import { CreateRoute, ItemRoute, ListRoute } from "./tasks.routes";
import db from "@/db";
import { tasks } from "@/db/schema";

export const list: AppRouteHandlrer<ListRoute> = async (c) => {
    const all = await db.query.tasks.findMany()
    return c.json(all)
}

export const create: AppRouteHandlrer<CreateRoute> = async (c) => {
    const task = c.req.valid('json')
    const [result] = await db.insert(tasks).values(task).returning()
    
    return c.json(result, HTTPStatusCodes.OK)
}

export const getItem: AppRouteHandlrer<ItemRoute> = async (c) => {
    const {id} = c.req.valid('param')
    const result = await db.query.tasks.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id)
        }
    })
    
    if(!!result) return c.json(result, HTTPStatusCodes.OK)

    return c.json({
        message: 'Not founded'
    }, HTTPStatusCodes.NOT_FOUND)
}