import { app } from '@/app'
import { makeOrg } from '@tests/factories/make-org.factory'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Create Org (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should create a new organization', async () => {
        const response = await request(app.server).post('/orgs').send(makeOrg())
        expect(response.status).toBe(201)
    })
})