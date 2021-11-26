import React from "react";

import { clsnm } from "utils";

import styles from "./StorageOrderForm.module.scss";

function StorageOrderFormHeader({
  className,
  children,
}: React.ComponentPropsWithoutRef<"header">) {
  return (
    <header className={clsnm(styles.header, className)}>{children}</header>
  );
}

export { StorageOrderFormHeader };
