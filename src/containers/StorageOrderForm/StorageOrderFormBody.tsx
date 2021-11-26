import React from "react";

import { clsnm } from "utils";

import styles from "./StorageOrderForm.module.scss";

function StorageOrderFormBody({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsnm(styles.body, className)} {...props}>
      {children}
    </div>
  );
}

export { StorageOrderFormBody };
