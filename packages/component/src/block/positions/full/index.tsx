import { Header } from "./header";
import { Divider } from "@/divider";
import { Listview } from "./listview";
import { FC } from "react";
import { PositionsViewProps } from "@/block";

export const PositionsViewFull: FC<PositionsViewProps> = (props) => {
  return (
    <div>
      <Header />
      <Divider />
      <Listview {...props} />
    </div>
  );
};
