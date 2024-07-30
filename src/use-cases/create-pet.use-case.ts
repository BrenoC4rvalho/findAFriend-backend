import { OrgsRepository } from '@/repositories/orgs.repository'
import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found.error'

interface CreatePetUseCaseRequest {
    name: string
    org_id: string
    about: string
    age: string
    size: string
    energy_level: string
    environment: string
}

interface CreatePetUseCaseResponse {
    pet: Pet
}

export class CreatePetUseCase {
    constructor(
        private orgRepository: OrgsRepository,
        private petRepository: PetsRepository,
    ) {}

    async execute(pet: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const org = await this.orgRepository.findById(pet.org_id)

        if (!org) {
            throw new OrgNotFoundError()
        }

        const newPet = await this.petRepository.create(pet)
        
        return { pet: newPet }
    }
}