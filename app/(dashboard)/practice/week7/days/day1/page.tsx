import { Button } from '@/components/ui/button';
import { createProduct } from './actions';

const Day1Page = () => {
  return (
    <form action={createProduct}>
      <Button type="submit">Submit</Button>
    </form>
  );
};
export default Day1Page;
