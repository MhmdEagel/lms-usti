import getCurrentUser from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function ClassroomCount() {
    const user = await getCurrentUser()
    if(!user) redirect("/auth/login")
    const classroomLength = await prisma.kelas.count({
        where: {
            dosenId: user?.id
        }
    })
  return (
    <p className="font-normal">{classroomLength}</p>
  )
}
