import {describe, it, expect, beforeEach } from 'vitest'
import { GetPetUseCase } from './get-pet.use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makePet } from '@tests/factories/make-pet.factory'
import { PetNotFoundError } from './errors/pet-not-found.error'

describe('Get Pet use case', () =>  {
    let orgsRepository: InMemoryOrgsRepository
    let petsRepository: InMemoryPetsRepository
    let sut: GetPetUseCase


    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new GetPetUseCase(petsRepository)
    })

    it('should return pet by id', async () => {
        const pet = await petsRepository.create(makePet())
        const findedPet = await sut.execute({ id: pet.id })

        expect(findedPet.pet).toEqual(pet)
    })

    it('should throw PetNotFoundError when pet not found', async () => {
        await expect(sut.execute({ id: 'nonexistent' })).rejects.toThrowError(PetNotFoundError)
    })
})