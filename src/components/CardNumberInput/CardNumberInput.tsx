import { useMemo } from "react";

import { removeNotNumbers } from "utils";

interface CardNumberInputProps {
  className?: string;
  value?: string;
  onChange?: (value?: string) => void;
}

const style = {
  fontSize: "1.5rem",
  padding: "0.25rem 0.5rem",
};

function CardNumberInput({ className, value, onChange }: CardNumberInputProps) {
  const formatValue = (value?: string) => {
    const cardValue = removeNotNumbers(value)?.match(
      /(\d{1,4})(\d{0,4})(\d{0,4})(\d{0,4})/
    );

    if (!cardValue?.[2]) {
      return cardValue?.[1] ?? "";
    }
    return `${cardValue[1]} ${cardValue[2]}${`${
      cardValue[3] ? ` ${cardValue[3]}` : ""
    }`}${`${cardValue[4] ? ` ${cardValue[4]}` : ""}`}`;
  };

  const resultVal = useMemo(() => formatValue(value), [value]);

  return (
    <input
      type="text"
      placeholder="Card Number"
      style={style}
      value={resultVal}
      className={className}
      onChange={(e) => {
        onChange?.(formatValue(e.target.value));
      }}
    />
  );
}

export { CardNumberInput };
