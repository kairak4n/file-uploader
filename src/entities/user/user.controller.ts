import { isAuth } from "../../auth/auth.middleware";
import { findUserById } from "./user.middleware";

export const userFilesGet = [
    isAuth,
    async (req: any, res: any) => {
        const userId = parseInt(req.params.userId);
        try {
            const user = await findUserById(userId)
            res.render('viewFiles', { user })
        } catch(err) {
            res.status(500).send("internal")
        }
    }
]