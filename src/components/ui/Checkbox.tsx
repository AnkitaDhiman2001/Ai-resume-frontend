import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className={`
            peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-blue-500
            checked:bg-blue-500 checked:text-white
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${className}
          `}
          onChange={(event) => {
            if (onCheckedChange) {
              onCheckedChange(event.target.checked);
            }
            if (props.onChange) {
              props.onChange(event);
            }
          }}
          {...props}
        />
        <span
          className={`
            pointer-events-none absolute left-0 top-0 h-4 w-4
            hidden peer-checked:block
            text-white
            bg-center bg-no-repeat
          `}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Cpath fill-rule='evenodd' d='M12.416 4.834a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06L6.5 9.914l4.97-4.97a.75.75 0 0 1 1.06 0z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };