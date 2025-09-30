import { Suspense } from "react";
import ClassroomList from "./ClassroomList/ClassroomList";
import { Spinner } from "@/components/ui/spinner";
import Searchbar from "@/components/common/Searchbar/Searchbar";

export default function Classroom({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-full">
          <Spinner size={80} className="text-primary" variant="circle" />
        </div>
      }
    >
      <Searchbar />
      <ClassroomList searchParams={searchParams} />
    </Suspense>
  );
}
