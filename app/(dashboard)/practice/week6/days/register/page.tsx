import { week6Days } from '../../page';
import RegisterForm from './_components/register-form';
import { getUsers } from './actions';

const RegisterPage = async () => {
  const weekDay = week6Days.find((w) => w.id === 7);
  const users = await getUsers();

  return (
    <>
      <h1 className="text-center  text-2xl space-x-2 mb-2">
        <span>Week:{weekDay?.week}</span>
        <span> {weekDay?.label}</span>
      </h1>
      <RegisterForm />
      <pre className="">{JSON.stringify(users, null, 2)}</pre>
    </>
  );
};
export default RegisterPage;
