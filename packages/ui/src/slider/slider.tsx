import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cnBase, VariantProps } from "tailwind-variants";
import { tv } from "../utils/tv";
import { Fragment, useMemo } from "react";
import { convertValueToPercentage, getThumbInBoundsOffset } from "./utils";

const sliderVariants = tv({
  slots: {
    root: "oui-relative oui-flex oui-w-full oui-touch-none oui-select-none oui-items-center",
    thumb: [
      "oui-block",
      "oui-h-[10px]",
      "oui-w-[10px]",
      "oui-rounded-full",
      "oui-border-[2px]",
      "oui-border-primary",
      "oui-bg-base-6",
      "oui-shadow",
      "oui-transition-colors",
      "focus-visible:oui-outline-none",
      // "focus-visible:oui-ring-1",
      // "focus-visible:oui-ring-ring",
      "focus:oui-h-[14px]",
      "focus:oui-w-[14px]",
      "focus:oui-border-[3px]",
      "disabled:oui-pointer-events-none",
      "disabled:oui-opacity-50",
    ],
    track:
      "oui-relative oui-h-[8px] oui-w-full oui-grow oui-overflow-hidden oui-rounded-full",

    trackInner:
      "oui-absolute oui-left-0 oui-right-0 oui-h-[2px] oui-top-[3px]  oui-pointer-events-none oui-bg-base-2",
    range: "oui-absolute oui-h-[2px] oui-top-[3px] oui-bg-primary",
    mark: "oui-absolute oui-top-[1px] oui-w-[6px] oui-h-[6px] oui-rounded oui-border oui-border-base-2 oui-bg-base-6 oui-pointer-events-none oui-translate-x-[-50%]",
  },
  variants: {
    color: {
      primary: {
        thumb: ["oui-border-primary", "oui-bg-base-5"],
        range: "oui-bg-primary",
      },
      primaryLight: {
        thumb: ["oui-border-primary-light", "oui-bg-base-5"],
        range: "oui-bg-primary-light",
      },
      buy: {
        thumb: ["oui-border-success", "oui-bg-base-5"],
        range: "oui-bg-success",
      },
      sell: {
        thumb: ["oui-border-danger", "oui-bg-base-5"],
        range: "oui-bg-danger",
      },
    },
  },
});

type SliderMarks = { value: number; label: string }[];

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
    VariantProps<typeof sliderVariants> & {
      // showMarks?: boolean;
      marks?: SliderMarks;
      markCount?: number;
      markLabelVisible?: boolean;
      showTip?: boolean;
      classNames?: {
        root?: string;
        thumb?: string;
        track?: string;
        range?: string;
      };
    }
>(
  (
    {
      className,
      color,
      marks,
      markCount,
      classNames,
      markLabelVisible,
      showTip,
      onValueChange,
      value: __propsValue,
      ...props
    },
    ref
  ) => {
    const { track, range, thumb, root, trackInner, mark } = sliderVariants({
      color,
    });

    const [innerValue, setInvalue] = React.useState(__propsValue);

    const innerMasks = useMemo<SliderMarks>(() => {
      let _max = props.max;
      if (!_max) {
        _max = 100;
      }

      if (Array.isArray(marks) && marks.length > 0) {
        return marks;
      }

      if (typeof markCount !== "undefined") {
        const marks: SliderMarks = [];

        // if(max === 0){

        // }

        const piece = _max / markCount;
        const len = markCount - 1;

        for (let i = 0; i <= len; i++) {
          const value = i * piece;
          marks.push({
            value,
            label: `${value}`,
          });
        }

        marks.push({
          value: _max,
          label: `100`,
        });

        return marks;
      }

      return [];
    }, [marks, markCount, props.max]);

    const onValueChangeInner = (value: number[]) => {
      // onValueChange?.(value);

      // console.log("value", value);
      setInvalue(value);

      onValueChange?.(value);
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={root({ className })}
        value={innerValue}
        onValueChange={onValueChangeInner}
        {...props}
      >
        <SliderPrimitive.Track
          className={track({ className: classNames?.track })}
        >
          <div className={trackInner()} />
          <SliderPrimitive.Range
            className={range({ className: classNames?.range })}
          />
        </SliderPrimitive.Track>
        {Array.isArray(innerMasks) && innerMasks.length > 0 && (
          <Marks
            value={innerValue}
            color={color}
            marks={innerMasks}
            isInnerMask={!Array.isArray(marks) || marks.length === 0}
            // min={props.min}
            // max={props.max}
            markLabelVisible={markLabelVisible}
            disabled={props.disabled}
            className={mark()}
          />
        )}
        <SliderPrimitive.Thumb
          className={thumb({
            className: classNames?.thumb,
          })}
        />
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export type SliderMarksProps = {
  value?: number[];
  marks?: SliderMarks;
  color?: "primary" | "buy" | "sell" | "primaryLight";
  // width: number;
  // min: number;
  // max: number;

  disabled?: boolean;
  markLabelVisible?: boolean;
  isInnerMask?: boolean;
  className?: string;
};

const Marks = (props: SliderMarksProps) => {
  const {
    marks,
    value,
    isInnerMask,
    markLabelVisible,
    className,
    color = "primary",
  } = props;
  const _value = useMemo(() => value?.[0] ?? 0, [value]);
  return (
    <>
      {marks?.map((mark, index) => {
        // const percent = convertValueToPercentage(mark.value, props.min, _max);
        const percent = convertValueToPercentage(index, 0, marks.length - 1);

        const thumbInBoundsOffset = getThumbInBoundsOffset(6, percent, 1);
        const __value = isInnerMask ? mark.value : index;

        const classNames =
          _value >= __value && _value > 0 && !props.disabled
            ? color === "primary"
              ? "oui-border-primary oui-bg-primary"
              : color === "buy"
              ? "oui-border-trade-profit oui-bg-trade-profit"
              : color === "sell"
              ? "oui-border-trade-loss oui-bg-trade-loss"
              : color === "primaryLight"
              ? "oui-border-primary-light oui-bg-primary-light"
              : ""
            : "";

        return (
          <Fragment key={index}>
            <span
              className={cnBase(className, classNames)}
              style={{
                left: `calc(${percent}% + ${thumbInBoundsOffset}px)`,
                // top: "7px",
              }}
            />
            {/* {!props.disabled && markLabelVisible && (
              <span
                key={index}
                className={cn(
                  "oui-absolute oui-top-[20px] oui-text-2xs oui-text-base-contrast/50 oui-pointer-events-none oui-translate-x-[-50%] desktop:oui-text-xs"
                )}
                style={{
                  left: `calc(${percent}% + ${thumbInBoundsOffset}px)`,
                }}
              >
                {mark.label}
              </span>
            )} */}
          </Fragment>
        );
      })}
    </>
  );
};

const Mark = () => {
  return <div />;
};

export { Slider };
