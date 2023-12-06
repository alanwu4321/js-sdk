import { MyOrderBook } from "@/page/trading/xs/sections/orderbook";
import { TabPane, Tabs } from "@/tab";
import { FC, useState } from "react";
import { TradeHistoryFull } from "./tradingHistory";

interface Props {
  symbol: string;
}

export const MyOrderBookAndTrade: FC<Props> = (props) => {
  const [value, setValue] = useState("orderbook");
  return (
    <Tabs
      value={value}
      onTabChange={(value) => setValue(value)}
      allowUngroup
      minWidth={280}
      tabBarClassName="orderly-h-[48px] orderly-text-sm"
    >
      <TabPane title="Orderbook" value="orderbook">
        <div className="orderly-px-3">
          <MyOrderBook symbol={props.symbol} />
        </div>
      </TabPane>
      <TabPane title="Last trades" value="tradeHistory">
        <TradeHistoryFull symbol={props.symbol} />
      </TabPane>
    </Tabs>
  );
};
