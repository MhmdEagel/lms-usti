import { useForm } from "react-hook-form";
import { useState } from "react";
import { INewPassword } from "@/types/Auth";
import { newPasswordSchema } from "@/schemas/schemas";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";
import { zodResolver } from "@hookform/resolvers/zod";

const useNewPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const toggleVisibility = (identifier: "password" | "confirmPassword") => {
    if (identifier === "password") {
      setVisibility({ ...visibility, password: !visibility.password });
    } else {
      setVisibility({
        ...visibility,
        confirmPassword: !visibility.confirmPassword,
      });
    }
  };

  const form = useForm({
    resolver: zodResolver(newPasswordSchema),
  });

  const { errors } = form.formState;

  const handleNewPassword = async (data: INewPassword) => {
    try {
      setIsPending(true);
      await newPassword(data, token);
    } catch (error) {
      form.setError("root", {
        message: (error as Error).message,
      });
    } finally {
      setIsPending(false);
    }
  };

  return {
    errors,
    handleNewPassword,
    form,
    isPending,
    visibility,
    toggleVisibility,
  };
};
export default useNewPasswordForm;
