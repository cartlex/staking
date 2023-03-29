import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Start = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-sky-500">
        <Navbar />
        <h1 className="font-medium flex justify-center text-[40px] text-slate-600 font-mono fixed top-[175px]">
          Staking platform
        </h1>
        <button onClick={() => setIsAuth(true)}>Start</button>

        <Footer />
      </div>
    </>
  );
};

export default Start;
