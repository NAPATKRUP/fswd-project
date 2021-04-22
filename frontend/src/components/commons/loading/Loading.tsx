import "./Loading.css";
import React, { FunctionComponent } from "react";

const Loading: FunctionComponent = () => {
  // useEffect(() => {
  //     console.log("set time out");
  // });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="text-2xl">Loading . . .</div>
    </div>
  );
};

export default Loading;
