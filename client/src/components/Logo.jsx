import { eth } from "../assets/index";
import { polygonMatic } from "../assets/index";

const Logo = () => {
  return (
    <div className="flex justify-center items-center">
      <img className="w-[100px] h-[100px]" src={eth} alt="eth" />
      <img className="w-[80px] h-[80px]" src={polygonMatic} alt="eth" />
    </div>
  );
};

export default Logo;
