/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import githubIcon from "../../assets/images/GitHub.png";

interface Props extends RouteComponentProps {}

function HeaderComponent(props: Props) {
  return (
    <div className="bg-blue-400 w-auto flex justify-between p-2">
      <div>
        <span className="text-white text-base font-semibold">Chat App</span>
      </div>
      <div>
        <a
          href="https://github.com/NiFos/chat_app_frontend"
          className="text-white text-base font-semibold flex items-center"
        >
          <img src={githubIcon} alt="Github icon" width={30} height={30} />
          <span className="ml-3">Github</span>
        </a>
      </div>
    </div>
  );
}

export const Header = withRouter(HeaderComponent);
