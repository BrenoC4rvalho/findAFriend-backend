import { describe, it, expect, beforeEach } from 'vitest'
import { FetchNearbyOrgsUseCase } from './fetch-nearby-orgs.use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makeOrg } from '@tests/factories/make-org.factory'

describe('fetch nearby orgs use case', () => {
    let orgsRepository: InMemoryOrgsRepository
    let sut: FetchNearbyOrgsUseCase

    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new FetchNearbyOrgsUseCase(orgsRepository)
    })

    it('should be able to find nearby orgs', async () => {
        const org = await orgsRepository.create(makeOrg())

        const nearbyOrgs = await sut.execute({
            userLatitude: org.latitude.toNumber(),
            userLongitude: org.longitude.toNumber()
        })

        expect(nearbyOrgs.orgs).toEqual([org])
    })
})