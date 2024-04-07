import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        const { name, username, bio, profileImage, coverImage } = req.body;
        console.log("edit.ts");
        console.log(name, username);
        if (!name || !username) {
            throw new Error("Missing fields");
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage,
            },
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}