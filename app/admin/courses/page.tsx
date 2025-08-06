import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import AdminCourseCard, {
  AdminCourseSkeleton,
} from "./_components/AdminCourseCard";
import EmptyState from "@/components/general/EmptyState";

async function renderCourses() {
  const data = await adminGetCourses();

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No Course Found"
          description="Create a new Course to get started"
          buttonText="Create Course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
          {data.map((item) => (
            <AdminCourseCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </>
  );
}

async function AdminCourseSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseSkeleton key={index} />
      ))}
    </div>
  );
}

const CoursesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <Suspense fallback={<AdminCourseSkeletonLayout />}>
        {renderCourses()}
      </Suspense>
    </>
  );
};

export default CoursesPage;
