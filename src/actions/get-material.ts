"use server";

import { readFile } from "fs/promises";
import { User } from "next-auth";

export const getMaterial = async ({user,kelasId, fileId}: {user: User, kelasId: string; fileId: string;}) => {
    if(!user) return null;
    const data = await readFile(`dir/materi/${kelasId}/${fileId}`);

    if(!data) {
        
    }

    const base64 = data.toString("base64");
    return base64
}