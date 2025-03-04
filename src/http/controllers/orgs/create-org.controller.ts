import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string(),
    zip_code: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    number: z.string(),
    latitude: z.number(),
    longitude: z.number()
})

export async function createOrgController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body)

    const createOrgUseCase = makeCreateOrgUseCase()

    try {
        const { org } = await createOrgUseCase.execute(body)
        return reply.status(201).send(org)
    } catch (error) {
        if(error instanceof OrgAlreadyExistsError) {
            return reply.status(400).send({ error: error.message })
        }
    }
}