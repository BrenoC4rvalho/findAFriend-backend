import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { AuthenticateOrgUseCase } from './authenticate-org.use-case'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

import { makeOrg } from '@tests/factories/make-org.factory'

describe('Authenticate Org use case', () => {
    let orgsRepository: InMemoryOrgsRepository
    let sut: AuthenticateOrgUseCase

    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new AuthenticateOrgUseCase(orgsRepository)
    })

    it('should authenticate an org with valid credentials', async () => {
        const org = await orgsRepository.create(
            makeOrg({ password: await hash('password', 6) })
        )

        const { org: authenticatedOrg } = await sut.execute({
            email: org.email,
            password: 'password'
        })

        expect(authenticatedOrg).toEqual(org)
    })

    it('should not be able to authenticate with email nonexistent', async () => {
        await expect(() => 
            sut.execute({
                email: 'nonexistent@email.com',
                password: 'password'
            }),
        ).rejects.toThrow(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const org = await orgsRepository.create(
            makeOrg({ password: await hash('password', 6) })
        )

        await expect(() => 
            sut.execute({
                email: org.email,
                password: 'wrong_password'
            }),
        ).rejects.toThrow(InvalidCredentialsError)
    })
})