import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Paths from "../../rotes/Paths";

const MainPage = () => {
  return (
    <>
      <Header />
      <div className="mainPage">
        <Sidebar />
        <div className="test_block">
          <Paths />
        </div>
      </div>
    </>
  );
};

export default MainPage;
