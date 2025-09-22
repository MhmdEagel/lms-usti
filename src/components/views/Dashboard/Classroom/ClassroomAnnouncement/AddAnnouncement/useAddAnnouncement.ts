import { createNewAnnouncement } from "@/actions/new-announcement";
import { newAnnouncementSchema } from "@/schemas/schemas";
import { IPengumuman } from "@/types/Kelas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useAddAnnouncement = (
  classId: string,
  userRole: string,
  userId: string
) => {
  const form = useForm({
    resolver: zodResolver(newAnnouncementSchema),
  });

  const [open, setOpen] = useState(false);

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleAddAnnouncement = async (data: IPengumuman) => {
    console.log(data);
    const res = await createNewAnnouncement(data, userRole, userId, classId);
    if (res.success && !res.error) {
      toast.success(res.success);
      handleOpen(false);
      form.reset();
      return
    }
    toast.error(res.error);
  };

  return {
    form,
    handleAddAnnouncement,
    open,
    handleOpen,
  };
};

export default useAddAnnouncement;
