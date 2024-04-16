
import { FC, SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export const EarnIcon: FC<IconProps> = (props) => {
    const { size = 60, viewBox, ...rest } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${49}px`}
            height={`${size}px`}
            fill="#335FFC"
            viewBox={`0 0 ${size} ${size}`}
            className="orderly-fill-primary"
            {...rest}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M30 30C31.6569 30 33 28.6569 33 27C33 25.3431 31.6569 24 30 24C28.3431 24 27 25.3431 27 27C27 28.6569 28.3431 30 30 30ZM30 32.25C32.8995 32.25 35.25 29.8995 35.25 27C35.25 24.1005 32.8995 21.75 30 21.75C27.1005 21.75 24.75 24.1005 24.75 27C24.75 29.8995 27.1005 32.25 30 32.25Z" fill="white" fillOpacity="0.36" />
            <path d="M56.25 15C56.25 21.2132 51.2132 26.25 45 26.25C38.7868 26.25 33.75 21.2132 33.75 15C33.75 8.7868 38.7868 3.75 45 3.75C51.2132 3.75 56.25 8.7868 56.25 15Z"  />
            <path fillRule="evenodd" clipRule="evenodd" d="M43.875 8.25C43.875 7.62868 44.3787 7.125 45 7.125C45.6213 7.125 46.125 7.62868 46.125 8.25V8.79668C47.6464 9.27452 48.75 10.6959 48.75 12.375H46.5C46.5 11.5466 45.8284 10.875 45 10.875C44.1716 10.875 43.5 11.5466 43.5 12.375C43.5 13.2034 44.1716 13.875 45 13.875C47.0711 13.875 48.75 15.5539 48.75 17.625C48.75 19.3041 47.6464 20.7255 46.125 21.2033V21.75C46.125 22.3713 45.6213 22.875 45 22.875C44.3787 22.875 43.875 22.3713 43.875 21.75V21.2033C42.3536 20.7255 41.25 19.3041 41.25 17.625H43.5C43.5 18.4534 44.1716 19.125 45 19.125C45.8284 19.125 46.5 18.4534 46.5 17.625C46.5 16.7966 45.8284 16.125 45 16.125C42.9289 16.125 41.25 14.4461 41.25 12.375C41.25 10.6959 42.3536 9.27452 43.875 8.79668V8.25Z" fill="white" fillOpacity="0.98" />
            <path fillRule="evenodd" clipRule="evenodd" d="M50.25 29.625C50.25 29.0037 50.7537 28.5 51.375 28.5C51.9963 28.5 52.5 29.0037 52.5 29.625L52.5 30L52.5 30.0115V30.375C52.5 30.4113 52.4983 30.4471 52.4949 30.4825C52.249 42.1714 43.0892 51.6679 31.5392 52.4482L33.0455 53.9545C33.4848 54.3938 33.4848 55.1062 33.0455 55.5455C32.6062 55.9848 31.8938 55.9848 31.4545 55.5455L28.0795 52.1705C27.6402 51.7312 27.6402 51.0188 28.0795 50.5795L31.4545 47.2045C31.8938 46.7652 32.6062 46.7652 33.0455 47.2045C33.4848 47.6438 33.4848 48.3562 33.0455 48.7955L31.6579 50.1831C42.0637 49.3399 50.246 40.6298 50.25 30.0077L50.25 30L50.25 29.625Z" fill="white" fillOpacity="0.36" />
            <path fillRule="evenodd" clipRule="evenodd" d="M26.9545 6.0455C26.5152 5.60616 26.5152 4.89384 26.9545 4.4545C27.3938 4.01517 28.1062 4.01517 28.5455 4.4545L31.9205 7.8295C32.3598 8.26884 32.3598 8.98116 31.9205 9.4205L28.5455 12.7955C28.1062 13.2348 27.3938 13.2348 26.9545 12.7955C26.5152 12.3562 26.5152 11.6438 26.9545 11.2045L28.3421 9.81689C17.9338 10.6603 9.75 19.3744 9.75 30V30.375C9.75 30.9963 9.24632 31.5 8.625 31.5C8.00368 31.5 7.5 30.9963 7.5 30.375V30V29.625C7.5 29.5887 7.50172 29.5529 7.50507 29.5175C7.75099 17.8286 16.9108 8.33211 28.4608 7.55182L26.9545 6.0455Z" fill="white" fillOpacity="0.36" />
            <path fillRule="evenodd" clipRule="evenodd" d="M30 14.25C30.5116 14.25 31.0176 14.2744 31.5167 14.3221C31.5056 14.5467 31.5 14.7727 31.5 15C31.5 15.539 31.5316 16.0705 31.593 16.593C31.0705 16.5316 30.539 16.5 30 16.5C22.5442 16.5 16.5 22.5442 16.5 30C16.5 33.623 17.9272 36.9127 20.25 39.3375C20.2576 36.0302 22.941 33.3516 26.25 33.3516H33.75C37.059 33.3516 39.7424 36.0302 39.75 39.3375C42.0728 36.9127 43.5 33.623 43.5 30C43.5 29.461 43.4684 28.9295 43.407 28.407C43.9295 28.4684 44.461 28.5 45 28.5C45.2273 28.5 45.4533 28.4944 45.6779 28.4833C45.7256 28.9824 45.75 29.4884 45.75 30C45.75 38.6985 38.6985 45.75 30 45.75C21.3015 45.75 14.25 38.6985 14.25 30C14.25 21.3015 21.3015 14.25 30 14.25ZM37.5 41.2267V39.3516C37.5 37.2805 35.8211 35.6016 33.75 35.6016H26.25C24.1789 35.6016 22.5 37.2805 22.5 39.3516V41.2267C24.6451 42.6626 27.2248 43.5 30 43.5C32.7752 43.5 35.3549 42.6626 37.5 41.2267Z" fill="white" fillOpacity="0.36" />
        </svg>

    );
}
