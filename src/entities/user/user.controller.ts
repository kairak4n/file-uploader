import { isAuth } from "../../auth/auth.middleware";
import prisma from "../../database/prismaClient"

export const userFilesGet = [
    isAuth,
    async (req: any, res: any) => {
        const userId = parseInt(req.params.userId);
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                files: true,
            }
        })
        res.render('viewFiles', { user })
    }
]