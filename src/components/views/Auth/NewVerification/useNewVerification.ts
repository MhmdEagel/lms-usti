import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useNewVerification = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Token tidak ada");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setRole(data.role);
        setError(data.error);
      })
      .catch(() => {
        setError("Terjadi kesalahan.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);


  return {
    error,
    success,
    role
  }

};

export default useNewVerification;
