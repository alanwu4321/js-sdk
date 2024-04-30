import { useModal } from "@/modal";
import { create } from "@/modal/modalHelper";
import { Sheet, SheetContent, SheetHeader } from "@/sheet/sheet";
import { Dialog, DialogContent } from "@/dialog/dialog";
import {
  useAccountInfo,
  useLeverage,
  useMediaQuery,
  useQuery,
  useSymbolsInfo,
} from "@orderly.network/hooks";
import { MEDIA_TABLET } from "@orderly.network/types";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { DesktopSharePnLContent } from "./desktopSharePnl";
import { MobileSharePnLContent } from "./mobileSharePnl";

export const SharePoisitionView = create<{
  position: any;
}>((props) => {
  const isTablet = useMediaQuery(MEDIA_TABLET);
  const { position } = props;
  // const [leverage] = useLeverage();
  const symbolInfo = useSymbolsInfo();
  const { data: info } = useAccountInfo();

  const maxAccountLeverage = info?.max_leverage;

  const {data: symbolData} = useQuery<any>(`/v1/public/info/${position.symbol}`, {
    // focusThrottleInterval: 1000 * 60 * 60 * 24,
    // dedupingInterval: 1000 * 60 * 60 * 24,
    // revalidateOnFocus: false,
    errorRetryCount: 3,
    errorRetryInterval: 200,
  });

  const maxLeverage = useMemo(() => {
    if (typeof maxAccountLeverage === 'undefined') {
      return "-";
    }
    const base = symbolData?.base_imr;
    if (typeof base === 'undefined') {
      return "-";
    }
    const maxSymbolLeverage = 1/base;
    console.log("symbol data", symbolData, maxSymbolLeverage);
    

    return Math.min(maxAccountLeverage, maxSymbolLeverage);
  }, [info?.max_leverage, symbolData]);

  if (symbolInfo.isNil) return null;

  

  const base_dp = symbolInfo[position.symbol]("base_dp");
  const quote_dp = symbolInfo[position.symbol]("quote_dp");

  return isTablet ? (
    <MobileSharePnL
      position={position}
      leverage={maxLeverage}
      baseDp={base_dp}
      quoteDp={quote_dp}
    />
  ) : (
    <DesktopSharePnL
      position={position}
      leverage={maxLeverage}
      baseDp={base_dp}
      quoteDp={quote_dp}
    />
  );
});

const MobileSharePnL: FC<
  PropsWithChildren<{
    className?: string;
    position: any;
    leverage: number | string;
    baseDp?: number;
    quoteDp?: number;
  }>
> = (props) => {
  const { leverage, position, baseDp, quoteDp } = props;
  const { visible, hide, resolve, reject, onOpenChange } = useModal();

  return (
    <Sheet open={visible} onOpenChange={onOpenChange}>
      <SheetContent
        id="orderly-referral-mweb-bg"
        className="orderly-px-4"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader
          id="orderly-asset-and-margin-sheet-title"
          // leading={<Logo.secondary size={30} />}
        >
          PnL Sharing
        </SheetHeader>
        <MobileSharePnLContent
          position={position}
          leverage={leverage}
          hide={hide}
          baseDp={baseDp}
          quoteDp={quoteDp}
        />
      </SheetContent>
    </Sheet>
  );
};

const DesktopSharePnL: FC<
  PropsWithChildren<{
    className?: string;
    position: any;
    leverage: number | string;
    baseDp?: number;
    quoteDp?: number;
  }>
> = (props) => {
  const { leverage, position, baseDp, quoteDp } = props;
  const { visible, hide, resolve, reject, onOpenChange } = useModal();

  const [viewportHeight, setViewportHeight] = useState(
    window.innerHeight < 900 ? 660 : 807
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight < 900 ? 660 : 807);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogContent
        className="orderly-shadow-lg orderly-w-[640px] orderly-bg-base-800 desktop:orderly-max-w-[640px] orderly-py-0"
        style={{ height: `${viewportHeight}px` }}
        autoFocus={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div
          id="orderly-referral-desktop-bg"
          style={{ height: `${viewportHeight}px` }}
        >
          <DesktopSharePnLContent
            position={position}
            leverage={leverage}
            hide={hide}
            baseDp={baseDp}
            quoteDp={quoteDp}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
