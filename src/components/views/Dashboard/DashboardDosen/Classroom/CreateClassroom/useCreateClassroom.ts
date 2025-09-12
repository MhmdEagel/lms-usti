import { zodResolver } from "@hookform/resolvers/zod";
import { newClassroomSchema } from "@/schemas/schemas";
import { INewClassroom } from "@/types/Kelas";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createNewClassroom } from "@/actions/new-classroom";

const useCreateClassroom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const createClassForm = useForm({
    defaultValues: {
      class_name: "",
      day: 0,
      room_number: 1,
      time_start: "",
      time_end: "",
    },
    resolver: zodResolver(newClassroomSchema),
  });

  const handleCloseForm = () => {
    setIsOpen(false);
    createClassForm.reset();
  };

  const handleCreateClassroom = async (data: INewClassroom) => {
    try {
      setIsPending(true);
      const res = await createNewClassroom(data);
      if (res.success) handleCloseForm();
    } catch (e) {
      createClassForm.setError("root", {
        message: (e as Error).message,
      });
    } finally {
      setIsPending(false);
    }
  };




  return {
    isOpen,
    isPending,
    setIsOpen,
    createClassForm,
    handleCreateClassroom,
    handleCloseForm,
  };
};

export default useCreateClassroom;
