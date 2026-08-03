import { ProjectSelect } from '@/db/schema';
import EditButton from './edit-button';
import DeleteButton from './delete-button';

interface ProjectsTableProps {
  projects: ProjectSelect[];
}
const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  return (
    <>
      <div className="overflow-x-auto mt-6 rounded-lg border mb-10">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-2 border-b font-semibold text-sm">ID</th>
              <th className="px-4 py-2 border-b font-semibold text-sm">Title</th>
              <th className="px-4 py-2 border-b font-semibold text-sm">Category</th>
              <th className="px-4 py-2 border-b font-semibold text-sm">Status</th>
              <th className="px-4 py-2 border-b font-semibold text-sm">Budget</th>
              <th className="px-4 py-2 border-b font-semibold text-sm">Deadline</th>
              <th className="px-4 py-2 border-b font-semibold text-sm">Featured</th>
              <th className="px-4 py-2 border-b font-semibold text-sm text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-6 text-gray-400">
                  No projects found
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border-b">{project.id}</td>
                  <td className="px-4 py-2 border-b">{project.title}</td>
                  <td className="px-4 py-2 border-b">{project.category}</td>
                  <td className="px-4 py-2 border-b">{project.status}</td>
                  <td className="px-4 py-2 border-b">{project.budget}</td>
                  <td className="px-4 py-2 border-b">
                    {project.deadline
                      ? typeof project.deadline === 'string'
                        ? new Date(project.deadline).toLocaleString()
                        : project.deadline.toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {project.isFeatured ? (
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-600 rounded">Yes</span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <EditButton  project={project} />
                    <DeleteButton id={project.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ProjectsTable;
