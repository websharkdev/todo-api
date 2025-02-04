import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from 'drizzle-zod'

export const tasks = pgTable('tasks', {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    name: text().notNull(),
    done: boolean().notNull().default(false),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
});

export const selectTasksSchema = createSelectSchema(tasks)
export const insertTasksSchema = createInsertSchema(tasks).omit({
    createdAt: true,
    updatedAt: true,
})

export const patchTasksSchema = insertTasksSchema.partial()