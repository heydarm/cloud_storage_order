import React from "react";

import { clsnm } from "utils";

import styles from "./StorageOrderForm.module.scss";
import { updStep, useStorageOrderStore } from "./storageOrderFormStore";

interface StorageOrderFormFooterProps
  extends React.ComponentPropsWithoutRef<"footer"> {
  onPrevClick?: React.MouseEventHandler | boolean;
  onNextClick?: React.MouseEventHandler | boolean;
  prevContent?: React.ReactNode;
  nextContent?: React.ReactNode;
  preventDefaultPrev?: boolean;
  preventDefaultNext?: boolean;
  nextDisabled?: boolean;
}

function StorageOrderFormFooter({
  onPrevClick,
  onNextClick,
  prevContent,
  nextContent,
  preventDefaultPrev,
  preventDefaultNext,
  nextDisabled,
  className,
  ...props
}: StorageOrderFormFooterProps) {
  const { dispatch } = useStorageOrderStore();

  return (
    <footer className={clsnm(styles.footer, className)} {...props}>
      {onPrevClick && (
        <button
          className={styles.stepBtn}
          onClick={(e) => {
            !preventDefaultPrev && dispatch(updStep((prev) => prev - 1));
            if (typeof onPrevClick === "function") {
              onPrevClick(e);
            }
          }}
        >
          {prevContent ?? "Back"}
        </button>
      )}
      {onNextClick && (
        <button
          className={styles.stepBtn}
          disabled={nextDisabled}
          onClick={(e) => {
            !preventDefaultNext && dispatch(updStep((prev) => prev + 1));
            if (typeof onNextClick === "function") {
              onNextClick(e);
            }
          }}
        >
          {nextContent ?? "Next"}
        </button>
      )}
    </footer>
  );
}

export { StorageOrderFormFooter };
