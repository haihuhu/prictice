import { week6Days } from '../../page';
import ContentForm from './_components/content-form';

import { getContents } from './actions';

const ContentsPage = async () => {
  const week6day = week6Days.find((w) => w.id === 6);

  const contents = await getContents();
  console.log(contents);

  return (
    <>
      <h1 className="text-2xl text-center space-x-2 my-2">
        <span>Week:{week6day?.week}</span> <span> {week6day?.label}</span>
      </h1>
      <ContentForm />

      {contents.map((content, index) => {
        return (
          <div key={index}>
            {content.username}: {content.message}
          </div>
        );
      })}
    </>
  );
};
export default ContentsPage;
