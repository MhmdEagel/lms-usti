import { useForm } from "react-hook-form";
import { useState } from "react";
import { IResetPassword } from "@/types/Auth";
import { resetSchema } from "@/schemas/schemas";
import { resetPassword } from "@/actions/reset";
import { zodResolver } from "@hookform/resolvers/zod";

const useResetPassword = () => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetSchema),
  });


  const {errors} = form.formState

  const handleResetPassword = async (data: IResetPassword) => {
    try {
      setIsPending(true);
      await resetPassword(data);
    } catch (error) {
      form.setError("root", {
        message: (error as Error).message,
      })
    } finally {
      setIsPending(false);
    }
  };

  return {
    form,
    handleResetPassword,
    errors,
    isPending,
  };

  
};
export default useResetPassword;
