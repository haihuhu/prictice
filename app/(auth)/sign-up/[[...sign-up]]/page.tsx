import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary: '#2563eb',
          borderRadius: '0.75rem',
        },
        elements: {
          card: 'shadow-xl border border-gray-200',
          headerTitle: 'text-2xl font-bold',
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
        },
      }}
    />
  );
}
