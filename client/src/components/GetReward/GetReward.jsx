import { useContext } from "react";
import { AppContext } from "../../context";
import Loader from "../UI/Loader";
import GetRewardButton from "./GetRewardButton";

const GetReward = () => {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {isLoading ? <Loader/> : <GetRewardButton />}
    </>
  );
};

export default GetReward;
