import { Pet, Prisma } from '@prisma/client'
import { InMemoryOrgsRepository } from './in-memory-orgs.repository'
import { findAllParams, PetsRepository } from '../pets.repository'



export class InMemoryPetsRepository implements PetsRepository {
    
    public items: Pet[] = []

    constructor(private orgsRepository: InMemoryOrgsRepository) {}
    findAll(params: findAllParams): Promise<Pet[]> {
        const orgsByCity = this.orgsRepository.items.filter((org) => org.city === params.city)
        
        const pets = this.items
            .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
            .filter((item) => (params.age ? item.age === params.age : true))
            .filter((item) => (params.size ? item.size === params.size : true))
            .filter((item) => (params.energy_level ? item.energy_level === params.energy_level : true))
            .filter((item) => (params.environment ? item.environment === params.environment : true))

        return Promise.resolve(pets)
    }

    async findById(id: string): Promise<Pet | null> {
        return this.items.find((pet) => pet.id === id) ?? null
    }

    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = {
            id: crypto.randomUUID(),
           ...data,
        }

        this.items.push(pet)

        return pet
    }

}