import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitContact } from './action';
import { week6Days } from '../../page';

const ContactPage = () => {
  const week6day = week6Days.find((w) => w.id === 1);
  return (
    <>
      <h1 className="text-center my-2 ">
        <span className="text-2xl px-2"> Week{week6day?.week}</span>
        {week6day?.label}
      </h1>
      <form action={submitContact} className="flex flex-col w-full max-w-4xl space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl">Name:</h2>
          <Input name="username" />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default ContactPage;
