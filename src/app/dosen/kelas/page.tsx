import Classroom from "@/components/views/Dashboard/DashboardDosen/Classroom/Classroom";
import { createMetadata } from "@/lib/metadata";

export const generateMetadata = () => createMetadata({ title: "Kelas" });

export default function ClassroomPage() {
  return <Classroom />;
}
