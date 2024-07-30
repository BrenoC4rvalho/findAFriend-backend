import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'
import { hash } from 'bcryptjs'
import { Decimal } from '@prisma/client/runtime/library'

interface CreateOrgUseCaseRequest {
    name: string
    author_name: string
    email: string
    whatsapp: string
    password: string
    zip_code: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    latitude: number
    longitude: number
}

interface CreateOrgUseCaseResponse {
    org: Org
}

export class CreateOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute(org: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {

        const orgByEmail = await this.orgsRepository.findByEmail(org.email)

        if (orgByEmail) {
            throw new OrgAlreadyExistsError()
        }

        const passoword_hash = await hash(org.password, 6)

        const data = {
            ...org,
            password: passoword_hash,
            latitude: new Decimal(org.latitude),
            longitude: new Decimal(org.longitude),
        }

        const newOrg = await this.orgsRepository.create(
            data
        )

        return { org: newOrg  } 
    }
}