import { useState } from "react";
import AddressForm from "./components/AddressForm";
import Navbar from "./components/Navbar";
import Loader from "../src/components/Loader";


const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-br from-teal-300 to-sky-500">
      <Navbar />
      <h1 className="font-medium flex items-center justify-center text-[40px] mt-[150px] text-slate-600">Fastest transactions with our application</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <AddressForm isLoading={isLoading} setIsLoading={setIsLoading} />
      )}
    </div>
  );
};

export default App;
