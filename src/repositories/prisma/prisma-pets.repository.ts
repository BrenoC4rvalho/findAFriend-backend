import { Pet, Prisma } from '@prisma/client';
import { findAllParams, PetsRepository } from '../pets.repository'
import { prisma } from '@/libs/prisma';

export class PrismaPetsRepository implements PetsRepository {
    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({ where: { id } })
        return pet
    }
    async findAll(params: findAllParams): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                age: params.age,
                size: params.size,
                energy_level: params.energy_level,
                environment: params.environment,
                org: {
                    city: {
                        contains: params.city,
                        mode: 'insensitive'
                    }
                }
            }
        })

        return pets
    }
    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({ data })
        return pet

    }

}