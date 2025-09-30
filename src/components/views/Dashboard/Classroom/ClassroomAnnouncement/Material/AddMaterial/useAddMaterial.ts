import { newAnnouncementSchema } from "@/schemas/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const useAddMaterial = () => {
    const addMaterialForm = useForm({
        resolver: zodResolver(newAnnouncementSchema)
    })

    return {
        addMaterialForm
    }
}
