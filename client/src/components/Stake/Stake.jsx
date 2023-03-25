import { useContext } from "react";
import MyModal from "../UI/MyModal/MyModal";
import { AppContext } from "../../context";
import Loader from "../UI/Loader";
import StakeButton from "./StakeButton";
import StakingForm from "./StakingForm";
import { useState } from "react";

const Stake = () => {
  const { isLoading, setIsLoading, modal, setModal } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const handleModalClick = () => {
    setModal(true);
  };

  return (
    <>
      {!modal && <StakeButton handleModalClick={handleModalClick} />}
      <MyModal visible={modal} setVisible={setModal}>
        {isLoading ? (
          <Loader />
        ) : (
          <StakingForm
            // isLoading={isLoading}
            setIsLoading={setIsLoading}
            setVisible={setModal}
            // setModal={handleModalClick}
          />
        )}
      </MyModal>
    </>
  );
};

export default Stake;
