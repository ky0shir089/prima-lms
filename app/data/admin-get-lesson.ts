import { prisma } from "@/lib/db";
import { requireAdmin } from "./admin/require-admin";
import { notFound } from "next/navigation";

export async function adminGetLesson(id: string) {
  await requireAdmin();

  const data = await prisma.lesson.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      position: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      chapterId: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type adminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;