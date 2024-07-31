import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { SearchPetsUseCase } from './search-pets.use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { makeOrg } from '@tests/factories/make-org.factory'
import { makePet } from '@tests/factories/make-pet.factory'

describe('search pets use case', () => {
    let orgsRepository: InMemoryOrgsRepository
    let petsRepository: InMemoryPetsRepository
    let sut: SearchPetsUseCase

    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new SearchPetsUseCase(petsRepository)
    })

    it('should return pets to search by city', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id}))
        await petsRepository.create(makePet({ org_id: org.id}))

        const org2 = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org2.id}))

        const { pets } = await sut.execute({ city: org.city })

        expect(pets).toHaveLength(2)

        const { pets: pets2 } = await sut.execute({ city: org2.city })

        expect(pets2).toHaveLength(1)
    })

    it('should return pets to search by city and age', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id, age: '1' }))
        await petsRepository.create(makePet({ org_id: org.id, age: '2' }))

        const { pets } = await sut.execute({ city: org.city, age: '1' })

        expect(pets).toHaveLength(1)
    })

    it('should return to search by city and size', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id, size: 'small' }))
        await petsRepository.create(makePet({ org_id: org.id, size: 'large' }))

        const { pets } = await sut.execute({ city: org.city, size: 'large' })
        expect(pets).toHaveLength(1)
    })

    it('should return to search by city and energy level', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id, energy_level: 'low' }))
        await petsRepository.create(makePet({ org_id: org.id, energy_level: 'high' }))
    
        const { pets } = await sut.execute({ city: org.city, energy_level: 'low' })
        expect(pets).toHaveLength(1)
    })

    it('should return to search by city and environment', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id, environment: 'indoor' }))
        await petsRepository.create(makePet({ org_id: org.id, environment: 'outdoor' }))

        const { pets } = await sut.execute({ city: org.city, environment: 'indoor' })
        console.log(pets)
        
        expect(pets).toHaveLength(1)
    })
})