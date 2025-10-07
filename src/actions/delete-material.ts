import { prisma } from "@/lib/db"

export const deleteMaterial = async (materialId: string) => {
    if (!materialId) return null

    try {
        await prisma.materi.delete({
            where: {
                id: materialId
            }
         })
         return {success: "Materi berhasil dihapus", error: null}
    } catch(e) {
        console.error((e as Error).message)
        return {success: null, error: "Terjadi kesalahan."}
    }

}