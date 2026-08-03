import { week7Days } from '../../page';
import ProjectForm from '../day4/components/project-form';
import ProjectsTable from './components/projects-table';
import { getAllProjects } from './queries';

const Day4Page = async () => {
  const weekday = week7Days.find((day) => day.id === 4);
  const projects = await getAllProjects();
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">week{weekday?.week}</h1>
        <h2 className="text-lg font-medium">{weekday?.label}</h2>
      </div>
      <ProjectForm />

      <ProjectsTable projects={projects} />
    </>
  );
};
export default Day4Page;
