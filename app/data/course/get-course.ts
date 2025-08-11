import "server-only"

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getIndividualCourse(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      description: true,
      smallDescription: true,
      price: true,
      duration: true,
      level: true,
      category: true,
      status: true,
      fileKey: true,
      slug: true,
      chapter: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if(!course) {
    return notFound();
  }

  return course;
}
