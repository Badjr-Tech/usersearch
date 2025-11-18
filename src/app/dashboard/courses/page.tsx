import { getAllClasses } from "@/app/dashboard/admin/CreateCourse/actions";
import Link from "next/link";

export default async function CoursesPage() {
  const courses = await getAllClasses();

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-foreground mb-8">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
