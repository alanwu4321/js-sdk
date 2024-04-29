
import { FC, SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export const HistoryIcon: FC<IconProps> = (props) => {
    const { size = 12, viewBox, ...rest } = props;
    return (
        <svg
            width={`${size}`}
            height={`${size}`}
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            fillOpacity="0.36"
            {...rest}
        >
            <path d="M6.00001 0C4.81332 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910852 2.60754 0.456726 3.7039C0.00259969 4.80026 -0.11622 6.00666 0.115291 7.17054C0.346802 8.33443 0.918247 9.40353 1.75736 10.2426C2.59648 11.0818 3.66558 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.29611 11.5433C9.39246 11.0892 10.3295 10.3201 10.9888 9.33343C11.6481 8.34673 12 7.18669 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11743 0.632141 7.5913 0 6.00001 0ZM9.00001 8.325L8.51251 9C8.50156 9.0143 8.48743 9.02585 8.47126 9.03375C8.45618 9.0454 8.4378 9.05197 8.41876 9.0525C8.40019 9.05624 8.38107 9.05624 8.36251 9.0525L8.31376 9.03L5.4 6.91875C5.3834 6.90515 5.36942 6.88863 5.35876 6.87C5.35319 6.84912 5.35319 6.82714 5.35876 6.80625V1.9575C5.35876 1.93879 5.36244 1.92026 5.3696 1.90297C5.37676 1.88568 5.38726 1.86997 5.40049 1.85674C5.41372 1.84351 5.42943 1.83301 5.44672 1.82585C5.46401 1.81869 5.48254 1.815 5.50126 1.815H6.34501C6.3828 1.815 6.41904 1.83001 6.44577 1.85674C6.47249 1.88346 6.4875 1.91971 6.4875 1.9575V6.315L9.00001 8.13C9.02479 8.15642 9.03858 8.19128 9.03858 8.2275C9.03858 8.26373 9.02479 8.29859 9.00001 8.325Z" />
        </svg>

    );
}
