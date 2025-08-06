import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetCourses() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await requireAdmin();

  const data = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      smallDescription: true,
      price: true,
      duration: true,
      level: true,
      category: true,
      status: true,
      fileKey: true,
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export type adminCoursesType = Awaited<ReturnType<typeof adminGetCourses>>[0];
