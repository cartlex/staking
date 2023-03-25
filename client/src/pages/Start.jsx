import { useState } from "react";

const Start = () => {
  const [isAuth, setIsAuth] = useState(false);
  
  return (
    <>
      <h1>Start</h1>
      <button onClick={() => setIsAuth(true)}>Start</button>
    </>
  );
};

export default Start;
