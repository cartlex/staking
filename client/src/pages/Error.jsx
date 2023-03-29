import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const StakingPage = () => {

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-red-500">
        <Navbar/>
      <h1 className="font-medium flex justify-center text-[100px] text-slate-600 font-mono fixed top-[175px]">
        Page not found! <br/>
        Invalid URL
      </h1>
      <Footer /> 
    </div>
  );
};

export default StakingPage;
