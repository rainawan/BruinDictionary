import Searchbar from '../components/Searchbar';
import Dictionary from '../pages/Dictionary';

const Home = () => {
  return (
    <section className="flex-col space-y-2">
      <Searchbar />
      <Dictionary />
    </section>
  );
};

export default Home;
