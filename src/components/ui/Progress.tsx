import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = "", value = 0, ...props }, ref) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`
          relative h-4 w-full overflow-hidden rounded-full bg-gray-200
          ${className}
        `}
        {...props}
      >
        <div
          className="h-full flex-1 bg-blue-500 transition-all"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };