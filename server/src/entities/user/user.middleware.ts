import prisma from '../../database/prismaClient'

async function findUserById(userId: number) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                files: true,
            }
        })
        return user;
    } catch(err) {
        throw Error(err as string)
    } finally {
        prisma.$disconnect()
    }
}

export { findUserById }