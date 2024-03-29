import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Start = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-sky-500 font-oswald">
        <Navbar />
        <h1 className="text-white text-[40px] fixed top-[100px]">Stake your funds in differnet currencies</h1>
        <div className="fixed left-[50px] top-[200px] w-[600px] h-[500px] bg-black bg-opacity-50 rounded-[10px]">
          <h1 className="text-[20px] text-zinc-300 m-[30px] ">
            Staking protocol is a new place where you can earn money staking them 
          </h1>
        </div>
        <Link to="/staking">
          <button className="fixed left-[100px] top-[630px] flex justify-center items-center text-zinc-300 hover:text-white bg-cyan-600 hover:bg-cyan-500 w-[150px] h-[40px] rounded-[10px]">
            Learn more {'>'}
          </button>
        </Link>
        
        <Footer />
      </div>
    </>
  );
};

export default Start;
