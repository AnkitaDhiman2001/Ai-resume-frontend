'use client';
import React from 'react';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  className = '',
  ...props
}) => {
  const baseStyles = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
  const classes = `${baseStyles} ${className}`;

  return <label className={classes} {...props} />;
};