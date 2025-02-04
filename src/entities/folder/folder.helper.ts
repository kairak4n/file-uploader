import prisma from "../../database/prismaClient"

async function createFolder(foldername: string, userId: number) {
    try {
        await prisma.folder.create({
            data: {
                name: foldername,
                userId: userId,
            }
        })
    } catch(err) {
        throw Error(err as string)
    } finally {
        await prisma.$disconnect();
    }
}

export { createFolder }