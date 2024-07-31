import { Pet, Prisma } from '@prisma/client'

export interface findAllParams {
    city: string
    age?: string
    size?: string
    energy_level?: string
    environment?: string
}

export interface PetsRepository {
    findById(id: string): Promise<Pet | null>
    findAll(params: findAllParams): Promise<Pet[]>
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}