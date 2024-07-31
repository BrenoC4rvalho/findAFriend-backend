import { Org, Prisma } from '@prisma/client';
import { FindManyNearbyParams, OrgsRepository } from '../orgs.repository'
import { prisma } from '@/libs/prisma';

export class PrismaOrgsRepository implements OrgsRepository {
    async findById(id: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({ where: { id } })
        return org
    }
    async findByEmail(email: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({ where: { email } })
        return org
    }
    async findManyNearby(params: FindManyNearbyParams): Promise<Org[]> {
        const gyms = await prisma.$queryRaw<Org[]>`
            SELECT * from orgs
            WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }
    async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const org = await prisma.org.create({ data })
        return org
    }
    
}