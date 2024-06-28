import { FC, useMemo, useState } from "react";
import { Popover } from "../popover/popover";
import { Calendar, CalendarProps } from "./date/calendar";
import { selectVariants } from "../select/selectPrimitive";
import { CalendarIcon } from "../icon/calendar";
import { CaretDownIcon } from "../icon/caretDown";
import type { SizeType } from "../helpers/sizeType";
import { DateRange, DayPickerRangeProps } from "react-day-picker";

export type DateRangePickerProps = {
  onChange?: (date: DateRange) => void;
  // selected: Date;
  placeholder?: string;
  value?: DateRange;
  initialValue?: DateRange;
  dateFormat?: string;
  size?: SizeType;
  className?: string;
} & Omit<DayPickerRangeProps, "mode">;

const DateRangePicker: FC<DateRangePickerProps> = (props) => {
  const {
    placeholder,
    dateFormat,
    onChange,
    value,
    initialValue,
    size,
    className,
    ...calendarProps
  } = props;
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(
    value || initialValue || null
  );

  const { trigger } = selectVariants({ size, className });

  const formattedValue = useMemo(() => {
    // console.log("dateRange", dateRange);
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return placeholder ?? "Select Date";
    }
    const arr = [];
    if (dateRange.from) arr.push(dateRange.from.toLocaleDateString());
    if (dateRange.to) arr.push(dateRange.to.toLocaleDateString());

    return `${arr.join(" - ")}`;
  }, [dateRange, placeholder]);

  const onOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && dateRange) {
      onChange?.(dateRange);
    }
    setOpen(nextOpen);
  };

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
      contentProps={{
        className: "oui-w-auto oui-p-0",
        align: "start",
      }}
      content={
        <Calendar
          {...calendarProps}
          mode={"range"}
          numberOfMonths={2}
          selected={dateRange}
          onSelect={setDateRange}
        />
      }
    >
      <button
        className={trigger({
          className: "orderly-datepicker-trigger oui-group",
        })}
      >
        <span className="orderly-datepicker-trigger-icon">
          <CalendarIcon size={14} className="oui-text-inherit" opacity={1} />
        </span>
        <span>{formattedValue}</span>
        <CaretDownIcon
          size={12}
          className="orderly-datepicker-trigger-arrow oui-text-inherit oui-transition-transform group-data-[state=open]:oui-rotate-180 group-data-[state=closed]:oui-rotate-0"
          opacity={1}
        />
      </button>
    </Popover>
  );
};

DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
