import { useSession } from "next-auth/react";

function useCurrentUser() {
  const session = useSession();
  const user = session.data?.user;
  return user;
}

export default useCurrentUser;
