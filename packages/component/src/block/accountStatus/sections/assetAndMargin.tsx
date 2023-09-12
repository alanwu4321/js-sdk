import React, { FC, useCallback, useContext, useMemo } from "react";
import Button from "@/button";
import { Divider } from "@/divider";
import { NetworkImage } from "@/icon/networkImage";
import { Paper } from "@/layout";
import { RiskIndicator } from "@/riskIndicator";
import { Slider } from "@/slider";
import { Statistic } from "@/statistic";
import { StatisticStyleProvider } from "@/statistic/defaultStaticStyle";
import { Numeral } from "@/text";
import { RotateCw } from "lucide-react";
import {
  useCollateral,
  usePositionStream,
  useMarginRatio,
  useLeverage,
} from "@orderly.network/hooks";

// import Slider from "rc-slider";
import { modal } from "@/modal";
import { toast } from "@/toast";
import { AssetsContext } from "@/provider/assetsProvider";
import { EyeIcon, EyeOffIcon } from "@/icon";

export interface AssetAndMarginProps {
  onDeposit?: () => Promise<void>;
  onWithdraw?: () => Promise<void>;
  onSettlement?: () => Promise<void>;
  onLeverageChange?: (value: number) => void;

  maxLeverage?: number | string;
}

const leverageLevers = [1, 2, 3, 4, 5, 10];

export const AssetAndMarginSheet: FC<AssetAndMarginProps> = (props) => {
  const { totalCollateral, freeCollateral, totalValue, availableBalance } =
    useCollateral({
      dp: 2,
    });
  const [{ aggregated, totalUnrealizedROI }] = usePositionStream();
  const [marginRatio, currentLeverage] = useMarginRatio();
  const { visible, toggleVisible } = useContext(AssetsContext);

  const [maxLeverage, { update }] = useLeverage();

  const [leverage, setLeverage] = React.useState(() => maxLeverage ?? 0);

  const leverageValue = useMemo(() => {
    const index = leverageLevers.findIndex((item) => item === leverage);

    return index;
  }, [leverage]);

  const onUnsettleClick = useCallback(() => {
    return modal.confirm({
      title: "Settle PnL",
      content: (
        <div className="text-base-contrast/60">
          Are you sure you want to settle your PnL?
        </div>
      ),
      onCancel: () => {
        return Promise.reject();
      },
      onOk: () => {
        if (typeof props.onSettlement !== "function") return Promise.resolve();
        return props.onSettlement().then(() => {
          toast.success("PnL settled");
        });
      },
    });
  }, []);

  return (
    <StatisticStyleProvider labelClassName="text-sm text-base-contrast/30">
      <div className="pt-5">
        <Statistic
          label={
            <div className="flex text-base items-center">
              <span>Total Value (USDC)</span>
              <button
                className="text-primary p-2"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleVisible();
                }}
              >
                {visible ? (
                  <EyeIcon className="text-primary" size={14} />
                ) : (
                  <EyeOffIcon className="text-primary" size={14} />
                )}
              </button>
            </div>
          }
          value={totalValue}
          rule="price"
          visible={visible}
        />
      </div>
      <div className="grid grid-cols-2 py-4">
        <Statistic
          label="Unreal.PnL(USDC)"
          value={
            <div className="flex gap-1 items-center">
              <Numeral coloring visible={visible}>
                {aggregated.unrealPnL}
              </Numeral>

              <Numeral
                visible={visible}
                rule="percentages"
                coloring
                surfix=")"
                prefix="("
                className="text-sm opacity-60"
              >
                {totalUnrealizedROI}
              </Numeral>
            </div>
          }
          rule="price"
          coloring
        />
        <Statistic
          label="Unsettled PnL(USDC)"
          value={
            <div className="flex justify-between">
              <Numeral rule="price" visible={visible} coloring>
                {aggregated.unsettledPnL}
              </Numeral>
              <button
                className="text-primary text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onUnsettleClick}
                disabled={aggregated.unsettledPnL === 0}
              >
                <RotateCw size={14} />
                <span>Settle PnL</span>
              </button>
            </div>
          }
        />
      </div>
      <Divider />
      <div className="grid grid-cols-2 py-4">
        <Statistic
          label="Margin Ratio"
          value={
            <div className="flex items-center gap-2">
              <Numeral
                rule="percentages"
                className="text-primary"
                visible={visible}
              >
                {marginRatio}
              </Numeral>

              {/* <RiskIndicator height={24} /> */}
            </div>
          }
        />
        <Statistic
          label="Free / Total Collateral(USDC)"
          value={
            <div>
              <Numeral visible={visible}>{freeCollateral}</Numeral> /{" "}
              <Numeral visible={visible}>{totalCollateral}</Numeral>
            </div>
          }
        />
      </div>

      <div>
        <Statistic
          label={
            <div className="flex justify-between">
              <span>Max Account Leverage</span>
              <span className="flex">
                Current:
                <Numeral
                  className="text-base-contrast ml-1"
                  surfix="x"
                  visible={visible}
                >
                  {currentLeverage}
                </Numeral>
              </span>
            </div>
          }
          value={
            <div className="h-[40px] mt-2 mx-2">
              <Slider
                min={0}
                max={5}
                color={"primary"}
                markLabelVisible
                value={[leverageValue]}
                showTip={false}
                // markCount={5}
                marks={[
                  {
                    value: 0,
                    label: "1x",
                  },
                  {
                    value: 1,
                    label: "2x",
                  },
                  {
                    value: 2,
                    label: "3x",
                  },
                  {
                    value: 3,
                    label: "4x",
                  },
                  {
                    value: 4,
                    label: "5x",
                  },
                  {
                    value: 5,
                    label: "10x",
                  },
                ]}
                onValueChange={(value) => {
                  const _value = leverageLevers[value[0]];

                  setLeverage(_value);
                  update({ leverage: _value }).then(
                    (res: any) => {
                      // console.log("res", res);
                      toast.success("Leverage updated");
                    },
                    (err: Error) => {
                      // console.log("err", err);
                      toast.error(err.message);
                      setLeverage(maxLeverage ?? 1);
                    }
                  );
                }}
              />
            </div>
          }
        />
      </div>
      <Divider className="py-4" />
      <Paper className="bg-base-100">
        <div className="flex justify-between text-sm text-base-contrast/50">
          <span>Instrument</span>
          <span>Available Balance</span>
        </div>
        <Divider className="py-3" />
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <NetworkImage name={"USDC"} type={"token"} size={"small"} />
            <span>USDC</span>
          </div>
          <Numeral precision={2} visible={visible}>
            {availableBalance}
          </Numeral>
        </div>
      </Paper>
      {/* <div className="flex gap-3 py-5">
        <Button fullWidth onClick={() => {}}>
          Deposit
        </Button>
        <Button fullWidth variant={"outlined"} onClick={() => {}}>
          Withdraw
        </Button>
      </div> */}
    </StatisticStyleProvider>
  );
};
