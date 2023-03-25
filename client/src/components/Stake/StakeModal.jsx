import { useContext } from "react";
import { AppContext } from "../../context";

const StakeModal = ({ children, visible, setVisible }) => {

  const { setStakeModal, setIsLoading } = useContext(AppContext);

    const handleModalOffClick = (e) => {
      e.stopPropagation();
    };
  
    return (
      visible && (
        <div
          onClick={() => setStakeModal(false)}
          className="flex fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 items-center justify-center"
        >
          <div
            onClick={handleModalOffClick}
            className="w-max justify-center items-center flex"
          >
            {children}
          </div>
        </div>
      )
    );
  };
  
  export default StakeModal;