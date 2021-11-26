import React from "react";

import { clsnm } from "utils";

import styles from "./CheckInput.module.scss";

interface CheckInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: React.ReactNode;
  groupId?: string;
}

function CheckInput({ label, className, groupId, ...props }: CheckInputProps) {
  return (
    <div className={styles.container}>
      <input
        className={clsnm(styles.input, className)}
        {...props}
        id={groupId}
        type="checkbox"
      />
      <label htmlFor={groupId} className={styles.label}>
        {label}
      </label>
    </div>
  );
}

export { CheckInput };
