'use client';

import { useUser } from '@clerk/nextjs';

const TestComponent = () => {
  const user = useUser();
  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold">Test Component</p>
        {user.isSignedIn ? (
          <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
        ) : (
          'Not signed in'
        )}
      </div>
    </>
  );
};

export default TestComponent;
