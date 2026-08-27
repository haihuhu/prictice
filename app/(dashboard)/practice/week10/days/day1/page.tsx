import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CopyButton from './_components/copy-button';

const Week10Day1Page = async () => {
  const user = await currentUser();
  const userInformation = await auth();
  // console.log(userInformation);

  if (!user) {
    return redirect('/sign-in');
  }

  const formatCreated = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const userEmail = user.primaryEmailAddress;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold">week 10 day 1</h1>
          <h2 className="text-sm text-gray-500">use clerk to get the user information</h2>
        </div>

        <div className="flex gap-2">
          <h3 className="flex gap-2 text-2xl font-bold">
            <p className="text-gray-500">ID:</p>
            {user.id.slice(0, 10)}...
          </h3>
          <CopyButton text={user.id} label="User ID" />
        </div>

        <h3 className="flex  gap-2 text-2xl font-bold">
          <p className="text-gray-500">Email:</p>
          {userEmail?.emailAddress ?? 'No email found'}
          <CopyButton text={userEmail?.emailAddress ?? 'No email found'} label="Email" />
        </h3>

        <h3 className="flex  gap-2 text-2xl font-bold">
          <p className="text-gray-500">FullName:</p>
          {user.fullName ?? 'No full name found'}
          <CopyButton text={user.fullName ?? 'No full name found'} label="Full Name" />
        </h3>

        <h3 className="flex  gap-2 text-2xl font-bold">
          <p className="text-gray-500">Created:</p>
          {formatCreated}
          <CopyButton text={formatCreated} label="Created" />
        </h3>

        <UserButton />
      </div>
    </>
  );
};

export default Week10Day1Page;
