import { FC } from "react";

export const DescripedImg: FC<{
  data: [array: any[], from?: number, to?: number];
  Component: any;
}> = ({ data, Component }) => {
  return <>{data[0].slice(data[1], data[2]).map((item) => item && <Component key={item.id} data={item} />)}</>;
};

