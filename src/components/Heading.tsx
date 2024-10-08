import { FC } from "react";
import { useNavigate } from "react-router";

export const HeadingSecondary: FC<{ text: string; to?: string }> = ({ text, to }) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    if (to) navigate(to);
  };

  return (
    <>
      <h2 className={`heading--secondary ${to ? "clickable" : ""}`} onClick={navigateHandler}>
        {text}
      </h2>
    </>
  );
};
