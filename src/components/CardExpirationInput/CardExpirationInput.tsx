import React from "react";

import { removeNotNumbers, leadZero, clsnm } from "utils";

import styles from "./CardExpirationInput.module.scss";

interface CardExpirationInputProps {
  className?: string;
  month: number | null;
  year: number | null;
  onChange?: (value: { month: number | null; year: number | null }) => void;
}

const CardExpirationInput = ({
  className,
  month,
  year,
  onChange,
}: CardExpirationInputProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let { name, value }: { name?: string; value?: string | number } = e.target;
    if (value.length > 3) return;
    value = Number(removeNotNumbers(value));

    if (name === "month" && value > 12) {
      value = 12;
    }

    onChange?.({
      month,
      year,
      [name]: value === 0 ? null : `${value}`.slice(-2),
    });
  };

  return (
    <div className={clsnm(styles.container, className)}>
      <input
        type="text"
        placeholder="mm"
        value={leadZero(month)}
        name="month"
        onChange={handleChange}
        className={styles.input}
      />
      <span>/</span>
      <input
        type="text"
        placeholder="yy"
        className={styles.input}
        name="year"
        value={leadZero(year)}
        onChange={handleChange}
      />
    </div>
  );
};

export { CardExpirationInput };
