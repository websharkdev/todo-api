
import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "@/db/schema";
import { notFoundedSchema } from "@/lib/constants";
import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

const tags = ['tasks']

export const list = createRoute({
    tags,
    path: '/tasks',
    method: "get",
    responses: {
        [HTTPStatusCodes.OK]: jsonContent(
            z.array(selectTasksSchema), 
            'The list of tasks'
        )
    }
})

export const create = createRoute({
    tags,
    path: '/tasks',
    method: 'post',
    request: {
        body: jsonContentRequired(insertTasksSchema, 'The tasks to create')
    },
    responses: {
        [HTTPStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            'The created task'
        ),
        [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertTasksSchema),
            'The validation errors'
        )
    }
})


export const getItem = createRoute({
    tags,
    path: '/tasks/{id}',
    method: "get",
    request: {
        params: IdParamsSchema
    },
    responses: {
        [HTTPStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            'The requested of tasks'
        ),
        [HTTPStatusCodes.NOT_FOUND]: jsonContent(
            notFoundedSchema,
            'Not founded'
        ),
        [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            'Invalid id error'
        )
    }
})



export const patch = createRoute({
    tags,
    path: '/tasks/{id}',
    method: 'patch',
    request: {
        params: IdParamsSchema,
        body: jsonContentRequired(patchTasksSchema, 'The task to update')
    },
    responses: {
        [HTTPStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            'The updated task'
        ),
        [HTTPStatusCodes.NOT_FOUND]: jsonContent(
            notFoundedSchema,
            'Not founded'
        ),
        [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
            [createErrorSchema(patchTasksSchema), createErrorSchema(IdParamsSchema)],
            'The validation errors'
        )
    }
})


export type ListRoute = typeof list
export type CreateRoute = typeof create
export type ItemRoute = typeof getItem
export type PatchRoute = typeof patch