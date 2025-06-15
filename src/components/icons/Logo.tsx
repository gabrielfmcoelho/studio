import type React from 'react';
import { APP_NAME } from '@/lib/constants';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

const Logo: React.FC<LogoProps> = ({ iconOnly = false, ...props }) => {
  return (
    <div className="flex items-center gap-2" aria-label={APP_NAME}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        {...props}
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!iconOnly && (
        <span className="text-xl font-headline font-semibold text-foreground">
          {APP_NAME.split(' ')[0]} <span className="text-primary">{APP_NAME.split(' ')[1]}</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
