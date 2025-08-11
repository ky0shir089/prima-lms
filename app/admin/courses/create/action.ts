"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { fixedWindow, request } from "@arcjet/next";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

export async function createCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();

    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Rate limit exceeded",
        };
      } else {
        return {
          status: "error",
          message: "You are a bot! if this is a mistake please contact us",
        };
      }
    }

    const valdidation = courseSchema.safeParse(values);

    if (!valdidation.success) {
      return {
        status: "error",
        message: "invalid form data",
      };
    }

    const data = await prisma.course.create({
      data: {
        ...valdidation.data,
        userId: session?.user.id as string,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
