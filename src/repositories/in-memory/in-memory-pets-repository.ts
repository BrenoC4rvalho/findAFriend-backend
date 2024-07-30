import { Pet, Prisma } from '@prisma/client'
import { InMemoryOrgsRepository } from './in-memory-orgs.repository'
import { PetsRepository } from '../pets.repository'



export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    constructor(private orgsRepository: InMemoryOrgsRepository) {}

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