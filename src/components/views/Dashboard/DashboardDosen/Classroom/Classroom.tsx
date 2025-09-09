import { Suspense } from "react";
import ClassroomList from "./ClassroomList/ClassroomList";
import { Spinner } from "@/components/ui/spinner";

export default function Classroom() {
  return (
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-full">
            <Spinner size={80} className="text-primary" variant="circle" />
          </div>
        }
      >
        <ClassroomList />
      </Suspense>
  );
}
