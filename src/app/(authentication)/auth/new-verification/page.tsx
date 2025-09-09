import NewVerification from "@/components/views/Auth/NewVerification/NewVerification";
import { createMetadata } from "@/lib/metadata";

export const generateMetadata = () =>
  createMetadata({ title: "Verifikasi Email" });

export default function VerificationPage() {
  return <NewVerification />;
}
