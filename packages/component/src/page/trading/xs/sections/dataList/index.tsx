import { TabContextState, TabPane, Tabs } from "@/tab";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { PositionPane } from "./position";
import { OrdersPane } from "@/page/trading/xs/sections/dataList/orders";
import { HistoryPane } from "./history";
import { PositionTabTitle } from "./position/tabTitle";
import { MemoizedOrdersTabTitle } from "./orders/tabTitle";

export const DataListView = () => {
  const [activeTab, setActiveTab] = useState("positions");

  return (
    <Tabs
      id="orderly-data-list"
      value={activeTab}
      onTabChange={setActiveTab}
      tabBarClassName="orderly-data-list-tab-bar orderly-bg-base-900 orderly-text-3xs"
    >
      <TabPane
        title={<PositionTabTitle />}
        value="positions"
        id="orderly-data-list-positions"
      >
        <PositionPane />
      </TabPane>
      <TabPane
        title={<MemoizedOrdersTabTitle />}
        value="orders"
        id="orderly-data-list-pending"
      >
        <OrdersPane />
      </TabPane>
      <TabPane title="History" value="history" id="orderly-data-list-history">
        <HistoryPane />
      </TabPane>
    </Tabs>
  );
};
