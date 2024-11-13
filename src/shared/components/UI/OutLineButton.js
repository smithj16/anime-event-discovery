import React from "react";

const Button = ({ onClick, text, outlineColor, bgColor }) => {
  return <DrawOutlineButton onClick={onClick} outlineColor={outlineColor} bgColor={bgColor}>{text}</DrawOutlineButton>;
};

const DrawOutlineButton = ({ children, onClick, outlineColor, bgColor, ...rest }) => {
  return (
    <button
      {...rest}
      className={`group relative ${bgColor} rounded px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms]`}
      onClick={onClick}
    >
      <span>{children}</span>

      {/* TOP */}
      <span className={`absolute left-0 top-0 h-[2px] w-0 ${outlineColor} transition-all duration-100 group-hover:w-full`} />

      {/* RIGHT */}
      <span className={`absolute right-0 top-0 h-0 w-[2px] ${outlineColor} transition-all delay-100 duration-100 group-hover:h-full`} />

      {/* BOTTOM */}
      <span className={`absolute bottom-0 right-0 h-[2px] w-0 ${outlineColor} transition-all delay-200 duration-100 group-hover:w-full`} />

      {/* LEFT */}
      <span className={`absolute bottom-0 left-0 h-0 w-[2px] ${outlineColor} transition-all delay-300 duration-100 group-hover:h-full`} />
    </button>
  );
};

export default Button;
