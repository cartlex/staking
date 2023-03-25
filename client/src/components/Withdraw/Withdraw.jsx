import { useContext } from "react";
import WithdrawButton from "../../components/Withdraw/WithdrowButton";
import { AppContext } from "../../context";
import Loader from "../UI/Loader";
import MyModal from "../UI/MyModal/MyModal";
import WithdrawForm from "./WithdrawForm";

const Withdraw = () => {
  const { isLoading, setIsLoading, modal, setModal } = useContext(AppContext);

 

  return (
    <>
      {!modal && <WithdrawButton />}
      <MyModal visible={modal} setVisible={setModal} isLoading={isLoading}>
        {isLoading ? (
          <Loader />
        ) : (
          <WithdrawForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setModal={setModal}
          />
        )}
      </MyModal>
    </>
  );
};

export default Withdraw;
