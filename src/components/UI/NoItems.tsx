import { FC } from "react";

const NoItems: FC<{ text: string }> = ({ text }) => (
  <div className="no-items">
    <p>{text}</p>
  </div>
);

export default NoItems;
