import { PlanCard } from "components";
import { CardExpirationInput } from "components/CardExpirationInput";
import { CardNumberInput } from "components/CardNumberInput";
import { calcPrice } from "utils";

import { StorageOrderFormBody } from "../StorageOrderFormBody";
import { StorageOrderFormFooter } from "../StorageOrderFormFooter";
import { StorageOrderFormHeader } from "../StorageOrderFormHeader";
import {
  storages,
  updCardCVV,
  updCardExpiration,
  updCardNumber,
  useStorageOrderStore,
} from "../storageOrderFormStore";
import styles from "./PaymentStep.module.scss";

function PaymentStep() {
  const { state, dispatch } = useStorageOrderStore();
  const {
    selectedPlan,
    storage,
    upfrontPayment,
    cardNumber,
    cardExpiration,
    cvv,
  } = state;

  const { month, year } = cardExpiration;

  return (
    <>
      <StorageOrderFormHeader>Payment details</StorageOrderFormHeader>
      <StorageOrderFormBody className={styles.body}>
        <div className={styles.card}>
          <CardNumberInput
            className={styles.cardNumber}
            value={cardNumber}
            onChange={(value) => dispatch(updCardNumber(value ?? ""))}
          />

          <CardExpirationInput
            className={styles.cardExpDate}
            month={month}
            year={year}
            onChange={({ month, year }) => {
              dispatch(updCardExpiration(month, year));
            }}
          />

          <input
            className={styles.cardCVV}
            type="text"
            placeholder="CVV"
            value={cvv?.toString() || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length > 3) {
                return;
              }
              dispatch(updCardCVV(val === "" ? null : Number(val)));
            }}
          />
        </div>
        <PlanCard
          duration={selectedPlan?.duration_months}
          price={calcPrice(
            storages[storage],
            selectedPlan?.price_usd_per_gb as any,
            upfrontPayment
          )}
          upfrontPayment={upfrontPayment}
          storage={storages[storage]}
        />
      </StorageOrderFormBody>
      <StorageOrderFormFooter
        onPrevClick={true}
        onNextClick={true}
        nextDisabled={
          cardNumber.length < 19 ||
          (cvv?.toString().length ?? 0) < 3 ||
          !cardExpiration.month ||
          !cardExpiration.year
        }
      />
    </>
  );
}

export { PaymentStep };
