import { FC, PropsWithChildren, createContext } from "react";
import { useSymbolsInfo } from "@orderly.network/hooks";

interface SymbolContextState {
  base_dp: number;
  quote_dp: number;
  base: string;
  quote: string;
}

export const SymbolContext = createContext({} as SymbolContextState);

interface FormatterProviderProps {
  symbol: string;
}

export const SymbolProvider: FC<PropsWithChildren<FormatterProviderProps>> = (
  props
) => {
  const symbolInfo = useSymbolsInfo()[props.symbol];
  return (
    <SymbolContext.Provider
      value={{
        base_dp: symbolInfo("base_dp"),
        quote_dp: symbolInfo("quote_dp"),
        base: symbolInfo("base"),
        quote: symbolInfo("quote"),
      }}
    >
      {props.children}
    </SymbolContext.Provider>
  );
};
