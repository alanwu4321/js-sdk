import { useEffect, useMemo, useState } from "react";
import { DateRange } from "../../../utils/types";
import { format, subDays } from "date-fns";
import {
  RefferalAPI,
  useMediaQuery,
  useRefereeInfo,
  useReferralRebateSummary,
} from "@orderly.network/hooks";
import { usePagination } from "@orderly.network/ui";

export interface ListReturns<T> {
  data: T;
  meta: {
    count: number;
    page: number;
    pageSize: number;
    pageTotal: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  dateRange?: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  isLoading?: boolean;
  loadMore?: () => void;
}

export type CommissionAndRefereesReturns = {
  commission: ListReturns<RefferalAPI.ReferralRebateSummary[] | undefined>;
  referees: ListReturns<RefferalAPI.RefereeInfoItem[] | undefined>;
};

export const useCommissionAndRefereesScript =
  (): CommissionAndRefereesReturns => {
    const commission = useCommissionDataScript();
    const referees = useRefereesDataScript();

    return {
      commission,
      referees,
    };
  };

const useCommissionDataScript = (): ListReturns<
  RefferalAPI.ReferralRebateSummary[] | undefined
> => {
  const [commissionRange, setCommissionRange] = useState<DateRange | undefined>(
    {
      from: subDays(new Date(), 90),
      to: subDays(new Date(), 1),
    }
  );

  const isLG = useMediaQuery("(max-width: 767px)");

  const { page, pageSize, setPage, setPageSize, parseMeta } = usePagination();

  const [commissionData, { refresh, isLoading, loadMore, meta }] =
    useReferralRebateSummary({
      startDate:
        commissionRange?.from !== undefined
          ? format(commissionRange.from, "yyyy-MM-dd")
          : undefined,
      endDate:
        commissionRange?.to !== undefined
          ? format(commissionRange.to, "yyyy-MM-dd")
          : undefined,
      size: pageSize,
      page: !isLG ? page : undefined,
    });

  useEffect(() => {
    refresh();
  }, [commissionRange]);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    console.log("page size change", pageSize);
    
    if (meta?.total) {
      setPageSize(pageSize);
      const state = parseMeta({
        total: meta?.total,
        current_page: page,
        records_per_page: pageSize,
      });
      console.log("page size change 222", {
        total: meta?.total,
        current_page: page,
        records_per_page: pageSize,
      }, state);
      
      setPage(state.page);
    }
  };

  // const loadMore = () => {
  //   setPage(page + 1);
  // };

  return {
    data: commissionData || undefined,
    meta: parseMeta(meta),
    onPageChange,
    onPageSizeChange,
    dateRange: commissionRange,
    setDateRange: setCommissionRange,
    isLoading,
    loadMore,
  };
};

const useRefereesDataScript = (): ListReturns<
  RefferalAPI.RefereeInfoItem[] | undefined
> => {
  const [commissionRange, setCommissionRange] = useState<DateRange | undefined>(
    {
      from: subDays(new Date(), 90),
      to: subDays(new Date(), 1),
    }
  );

  const isLG = useMediaQuery("(max-width: 767px)");

  const { page, pageSize, setPage, setPageSize, parseMeta } = usePagination();

  const [commissionData, { refresh, isLoading, loadMore, meta }] =
    useRefereeInfo({
      startDate:
        commissionRange?.from !== undefined
          ? format(commissionRange.from, "yyyy-MM-dd")
          : undefined,
      endDate:
        commissionRange?.to !== undefined
          ? format(commissionRange.to, "yyyy-MM-dd")
          : undefined,
      size: pageSize,
      page: !isLG ? page : undefined,
    });

  useEffect(() => {
    refresh();
  }, [commissionRange]);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    console.log("page size change", pageSize);
    
    if (meta?.total) {
      setPageSize(pageSize);
      const { page: currentPage } = parseMeta({
        total: meta?.total,
        current_page: page,
        records_per_page: pageSize,
      });
      console.log("page size change 222", currentPage);
      
      setPage(currentPage);
    }
  };

  // const loadMore = () => {
  //   setPage(page + 1);
  // };

  return {
    data: commissionData || undefined,
    meta: parseMeta(meta),
    onPageChange,
    onPageSizeChange,
    dateRange: commissionRange,
    setDateRange: setCommissionRange,
    isLoading,
    loadMore,
  };
};
