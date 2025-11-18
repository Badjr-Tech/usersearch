import { getAllClasses } from './actions';
import CreateCourseClientPage from './CreateCourseClientPage';

export default async function AdminCreateCoursePage() {
  const allClasses = await getAllClasses();

  return <CreateCourseClientPage allClasses={allClasses} />;
}
