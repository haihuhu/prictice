import { findUserById } from '../../../queries/user-queries';
import ProjectCreateSection from './_components/project-create-section';
import ProjectTable from './_components/project-table';

const UserProjectsPage = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await findUserById(Number(userId));
  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
      </div>
    );
  }
  const isOwner = user.ownerProjects.some((project) => project.ownerId === Number(userId));
  const isReviewer = user.reviewProjects.some((project) => project.reviewerId === Number(userId));

  return (
    <div>
      <div className="space-y-6">
        <ProjectCreateSection userId={user.id} categories={user.categories} />
        <ProjectTable
          projects={user.ownerProjects}
          title="Owned Projects"
          userId={userId}
          canDelete={isOwner}
        />
        <ProjectTable
          projects={user.reviewProjects}
          title="Review Projects"
          userId={userId}
          canDelete={isReviewer}
        />
      </div>
    </div>
  );
};

export default UserProjectsPage;
