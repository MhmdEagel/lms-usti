"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const deleteAnnoucement = async (annId: string) => {
    try {
        await prisma.pengumuman.delete({
            where: {
                id: annId
            }
        })
        revalidatePath(".")
        return {success: "Item berhasil dihapus", error: null}
    } catch (e) {
        console.error((e as Error).message)
        return {success: null, error: "Terjadi kesalahan"}
    }
}
