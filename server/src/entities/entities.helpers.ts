import prisma from '../database/prismaClient'

export async function createFile(
    filename: string,
    mimetype: string,
    size: number,
    path: string,
    userId: number,
    folderId: number | null,
) {
    try {
        return await prisma.file.create({
            data: {
                filename,
                mimetype,
                size,
                path,
                userId,
                folderId,
            }
        })
    } catch(err) {
        console.error(err);
    } finally {
        await prisma.$disconnect()
    }
}