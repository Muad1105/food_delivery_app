import ProdutsSection from "../components/ProductItemsDisplaySection";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <div className="mt-[80px] ml-[300px]">
        <ProdutsSection />
      </div>
    </div>
  );
};

export default Home;
