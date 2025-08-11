"use client";

import { useTransition } from "react";
import { enrollInCourseAction } from "../action";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId)
      );

      if (error) {
        toast.error("Failed to create course");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <Button className="w-full" onClick={onSubmit} disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Loading...
        </>
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
}
