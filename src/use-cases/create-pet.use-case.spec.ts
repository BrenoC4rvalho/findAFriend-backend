import { describe, it, expect, beforeEach } from 'vitest'

import { PetRepository } from '@/repositories/pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { CreatePetUseCase } from './create-pet.use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { makeOrg } from '@tests/factories/make-org.factory'
import { makePet } from '@tests/factories/make-pet.factory'
import { OrgNotFoundError } from './errors/org-not-found.error'

describe('Create Pet Use Case', () => {
    let orgsRepository: InMemoryOrgsRepository
    let petsRepository: PetRepository
    let sut: CreatePetUseCase

    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new CreatePetUseCase(orgsRepository, petsRepository)
    })

    it('should create a new pet', async () => {
        const org = await orgsRepository.create(makeOrg())
        const { pet } = await sut.execute(makePet({ org_id: org.id }))

        // expect(pet).toBeTruthy()
        expect(petsRepository.items).toHaveLength(1)
        expect(pet.id).toEqual(expect.any(String))
    })

    it('should throw an error if the org does not exist', async () => {
        const pet = makePet()

        await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
    })


})