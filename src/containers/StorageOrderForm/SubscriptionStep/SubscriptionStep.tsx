import { CheckInput, PlanCard } from "components";
import { RangeInput } from "components/RangeInput";
import { calcPrice } from "utils";

import { StorageOrderFormBody } from "../StorageOrderFormBody";
import { StorageOrderFormFooter } from "../StorageOrderFormFooter";
import { StorageOrderFormHeader } from "../StorageOrderFormHeader";
import {
  storages,
  updSelectedPlan,
  updStorage,
  updUpfrontPayment,
  useStorageOrderStore,
} from "../storageOrderFormStore";
import styles from "./SubscriptionStep.module.scss";

function SubscriptionStep() {
  const { state, dispatch } = useStorageOrderStore();
  const { plans, selectedPlan, storage, upfrontPayment } = state;

  return (
    <>
      <StorageOrderFormHeader>
        <h1>Select your plan</h1>
      </StorageOrderFormHeader>

      <StorageOrderFormBody>
        <div className={styles.plansContainer}>
          {plans.map(({ duration_months, price_usd_per_gb }) => (
            <PlanCard
              selected={duration_months === selectedPlan?.duration_months}
              onClick={() =>
                dispatch(updSelectedPlan({ duration_months, price_usd_per_gb }))
              }
              key={duration_months}
              duration={duration_months}
              price={
                storage != null
                  ? calcPrice(
                      storages[storage],
                      price_usd_per_gb,
                      upfrontPayment
                    )
                  : null
              }
            />
          ))}
        </div>

        <RangeInput
          min="0"
          max="2"
          step="1"
          label={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>Storage</span>
              <span style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
                {storage != null ? `${storages[storage]}GB` : null}
              </span>
            </span>
          }
          value={storage}
          onChange={(e) => dispatch(updStorage(Number(e.target.value)))}
          groupId="storage"
        />

        <CheckInput
          groupId="upfront-payment"
          label="I want to make an upfront payment"
          checked={upfrontPayment}
          onChange={(e) => dispatch(updUpfrontPayment(e.target.checked))}
        />
      </StorageOrderFormBody>

      <StorageOrderFormFooter
        onNextClick={true}
        nextDisabled={plans.length === 0}
      />
    </>
  );
}

export { SubscriptionStep };
