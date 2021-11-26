import React from "react";

import { clsnm } from "utils";

import styles from "./RangeInput.module.scss";

interface RangeInputProps extends React.ComponentPropsWithoutRef<"input"> {
  groupId?: string;
  label?: React.ReactNode;
  containerClassName?: string;
}

function RangeInput({
  groupId,
  label,
  className,
  containerClassName,
  ...props
}: RangeInputProps) {
  return (
    <div className={clsnm(styles.container, containerClassName)}>
      <label htmlFor={groupId} className={styles.label}>
        {label}
      </label>
      <input
        {...props}
        className={clsnm(styles.input, className)}
        type="range"
        id={groupId}
      />
    </div>
  );
}

export { RangeInput };
