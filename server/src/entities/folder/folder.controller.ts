import { createFolder } from "./folder.helper"

function folderCreateGet(req: any, res: any) {
    res.render("create-folder")
}

async function folderCreatePost(req: any, res: any) {
    await createFolder(req.body.foldername, req.user.id) 
    res.redirect("/")
}

export { folderCreateGet, folderCreatePost }