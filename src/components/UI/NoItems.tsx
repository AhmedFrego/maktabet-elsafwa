import { FC } from "react";

export const NoItems: FC<{ text: string }> = ({ text }) => (
  <div className="no-items">
    <p>{text}</p>
  </div>
);

