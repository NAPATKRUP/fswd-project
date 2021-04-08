import { FunctionComponent } from "react";
import logo from "../logo.svg";
import "../styles/AppHeader.css";

interface AppHeaderProps {
  title: string;
  description: string;
}

const AppHeader: FunctionComponent<AppHeaderProps> = ({ title, description }) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p data-testid="app-header-title">
        <code>{title}</code>.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        {description}
      </a>
    </header>
  );
};

export default AppHeader;
