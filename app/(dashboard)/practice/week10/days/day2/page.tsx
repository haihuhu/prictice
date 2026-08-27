import { getOrCreateCurrentUserId } from '@/lib/auth';
import { currentUser } from '@clerk/nextjs/server';

const Week10Day2Page = async () => {
  const userId = await getOrCreateCurrentUserId();

  const user = await currentUser();

  if (!user) {
    return <>Please sign in!</>;
  }

  const email = user.emailAddresses[0]?.emailAddress ?? 'No email';

  const fullName = user.fullName ?? 'No name';

  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US')
    : 'No createdAt';

  return (
    <>
      <main className="mx-auto max-w-xl space-y-6 p-8">
        <h1 className="text-2xl font-bold">Profile</h1>

        <div className="space-y-2">
          {/* Display the first 8 characters of the user ID */}

          <p>User ID: {user.id.slice(0, 8)}</p>

          {/* Display the user's full email */}
          <p>Email:{email}</p>

          {/* Display first name and last name */}
          <p>Name: {fullName}</p>

          {/* Display the registration date */}
          <p>Created at: {createdAt}</p>
        </div>
      </main>
    </>
  );
};

export default Week10Day2Page;
