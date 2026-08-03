import { week7Days } from '../../page';
import ProjectForm from './components/project-form';
import { getAllProjects } from './queries';

const ProjectsPage = async () => {
  const projects = await getAllProjects();
  const week7day = week7Days.find((day) => day.id === 3);

  return (
    <>
      <div className="w-full text-center mx-auto">
        <h1 className="text-2xl font-bold">week:{week7day?.week}</h1>
        <h2 className="text-lg font-bold">{week7day?.label}</h2>
      </div>
      <ProjectForm />
    </>
  );
};
export default ProjectsPage;
