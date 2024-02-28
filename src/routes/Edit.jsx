import { useParams } from 'react-router-dom';

const Edit = () => {
  const { entryid } = useParams();
  console.log(entryid);

  return <section>Edit</section>;
};

export default Edit;
