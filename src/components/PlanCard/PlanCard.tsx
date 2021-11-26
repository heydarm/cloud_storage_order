import React from "react";

import { clsnm } from "utils";

import styles from "./PlanCard.module.scss";

interface PlanCardProps {
  duration?: number;
  price?: number | null;
  storage?: number;
  upfrontPayment?: boolean;
  selected?: boolean;
  onClick?: React.MouseEventHandler;
}

function PlanCard({
  selected,
  duration,
  price,
  storage,
  upfrontPayment,
  onClick,
}: PlanCardProps) {
  return (
    <article
      className={clsnm(styles.container, selected && styles.selected)}
      onClick={onClick}
    >
      <h1 className={styles.title}>{duration} Months</h1>
      <div className={styles.body}>
        {storage != null && <span className={styles.storage}>{storage}GB</span>}

        <strong className={styles.price}>{price}$</strong>

        {upfrontPayment && (
          <span className={styles.upfrontPayment}>Upfront Payment</span>
        )}
      </div>
    </article>
  );
}

export { PlanCard };
