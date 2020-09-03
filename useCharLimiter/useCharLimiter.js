import React from "react";
import { useRef } from "react";
import PropTypes from "prop-types";

export const useCharLimiter = ({
  body = "",
  count = 10,
  finish = true,
  all = true,
  symbol = ` ...`,
}) => {
  const element = () => {
    return React.createElement(
      symbol.type,
      { ...symbol.params },
      symbol.character
    );
  };

  let trimed;
  const fullBody = body.trim().split(" ");
  const text = useRef(body);

  if (fullBody.length >= count) {
    const bodySlice = fullBody.slice(0, count);
    text.current = bodySlice.join(" ");
    trimed = true;
  }

  if (finish && typeof symbol !== "object") {
    if (trimed || all) {
      const suspensive = [...text.current, symbol];
      text.current = suspensive.join("");
    }
  }

  if (typeof symbol === "object" && finish) {
    if (trimed && !all) {
      return (
        <>
          {text.current}
          {element()}
        </>
      );
    } else if (all) {
      return (
        <>
          {text.current}
          {element()}
        </>
      );
    } else {
      return <>{text.current}</>;
    }
  } else {
    return <>{text.current}</>;
  }
};

useCharLimiter.propTypes = {
  body: PropTypes.string.isRequired,
};
