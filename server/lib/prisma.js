import "dotenv/config"
import { PrimaPg } from "@prisma/adapter-pg"
import { Prisma, PrismaClient } from  "../generated/prisma/client.js"

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrimaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
