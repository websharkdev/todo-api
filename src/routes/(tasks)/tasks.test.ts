import createApp, { createTestApp } from '@/lib/create-app'
import { testClient } from 'hono/testing'
import { describe, expect, expectTypeOf, it } from 'vitest'
import router from '../(tasks)/tasks.index'


describe('Tasks list', () => {
    it('responsds with an array again', async () => {
        const client = testClient(createApp().route('/', router))
        const response = await client.tasks.$get()
        const json = await response.json()

        expectTypeOf(json).toBeArray()
    })
    it('validate the id param (is undefined)', async () => {
        const client = testClient(createApp().route('/', router))
        const response = await client.tasks[':id'].$get({
            param: {
                id: 4324,
            }
        })
        
        expect(response.status).toBe(404)
    })
    it('validate the id param (is validation error)', async () => {
        const client = testClient(createApp().route('/', router))
        const response = await client.tasks[':id'].$get({
            param: {
                // @ts-expect-error
                id: 'Wat', 
            }
        })
        
        expect(response.status).toBe(422)
    })
    it('validate the creation error', async () => {
        const client = testClient(createApp().route('/', router))
        const response = await client.tasks.$post({
            json: {
                name: 'Learn vitest',
            }
        })


        // Gonna be <:200:> cuz <done> is <false> by default
        expect(response.status).toBe(200)
    })
})