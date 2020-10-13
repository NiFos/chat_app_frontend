/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { primaryBtnClasses } from "./classes";
import { ButtonEnum } from "./types";

interface ButtonProps {
  onClick?: any;
}
interface Props extends ButtonProps {
  type?: ButtonEnum;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: any;
  className?: any;
}

export function Button(props: Props) {
  const [classes, setClasses] = React.useState("");
  React.useEffect(() => {
    setClassesByType();
  }, [props]);

  function setClassesByType() {
    switch (props.type) {
      case ButtonEnum.primary:
        setClasses(primaryBtnClasses);
        break;

      default:
        break;
    }
  }
  return (
    <button
      className={`${classes} ${props.fullWidth ? " min-w-full" : ""} ${
        props.className
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
