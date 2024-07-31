import { FC, PropsWithChildren, cloneElement, useMemo } from "react";
import { ChainIcon, ChainIconProps } from "./chainIcon";
import { TokenIcon, TokenIconProps } from "./tokenIcon";
import { cnBase } from "tailwind-variants";

export type CombineIconProps = {
  secondary: ChainIconProps | TokenIconProps;
};

export const CombineIcon: FC<PropsWithChildren<CombineIconProps>> = (props) => {
  const { secondary } = props;

  const subElement = useMemo(() => {
    const className =
      "oui-bg-base-6 oui-absolute oui-bottom-0 oui-right-0 oui-outline oui-outline-2 oui-outline-base-1 oui-z-10";

    if ("chainId" in secondary) {
      return (
        <ChainIcon
          {...secondary}
          className={cnBase(className, secondary?.className)}
        />
      );
    } else {
      return (
        <TokenIcon
          {...secondary}
          className={cnBase(className, secondary?.className)}
        />
      );
    }
  }, [secondary]);

  return (
    <div className="oui-relative">
      {props.children}
      {subElement}
    </div>
  );
};
