import "server-only"

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetRecentCourses() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  await requireAdmin();

  const data = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      status: true,
      price: true,
      fileKey: true,
      slug: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
  });

  return data;
}
