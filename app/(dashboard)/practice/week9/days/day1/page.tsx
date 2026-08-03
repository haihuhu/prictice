import { week9Days } from '../../page';

const Week9Day1Page = () => {
  const day = week9Days.find((day) => day.id === 1);
  console.log(day);

  return (
    <>
      <div>
        <h1 className="text-2xl text-center font-bold">Week{day?.week}</h1>
        <p className="text-center">This is the first day of week 9.</p>
      </div>
      
    </>
  );
};

export default Week9Day1Page;
