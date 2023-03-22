import { useState } from "react";
import AddressForm from "./components/AddressForm";
import Navbar from "./components/Navbar";
import Loader from "../src/components/Loader";
import MyModal from "./components/UI/MyModal/MyModal";
import CreateTxButton from "./components/CreateTxButton";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const handleModalClick = () => {
    setModal(true);
  };
  return (
    <div className="h-screen bg-gradient-to-br from-teal-300 to-sky-500">
      <Navbar />

      <h1 className="font-medium flex items-center justify-center text-[40px] mt-[200px] text-slate-600">
        Fastest transactions with our application
      </h1>
      {!modal &&<CreateTxButton handleModalClick={handleModalClick}/>}
      <MyModal visible={modal} setVisible={setModal} isLoading={isLoading}>
        {isLoading ? (
          <Loader/>
        ) : (
          <AddressForm isLoading={isLoading} setIsLoading={setIsLoading} setModal={setModal}/>
        )}
      </MyModal>
    </div>
  );
};

export default App;
