import { FunctionComponent } from "react";
import AppHeader from "../components/AppHeader";

const HomeScreen: FunctionComponent = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <AppHeader title={"title"} description={"description"} />
    </div>
  );
};

export default HomeScreen;
