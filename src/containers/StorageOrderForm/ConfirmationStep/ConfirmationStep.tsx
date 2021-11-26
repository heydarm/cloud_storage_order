import { useState } from "react";

import { CheckInput } from "components";
import { useRequest } from "hooks";
import { apiConfirmOrder } from "services/requestService";
import { calcPrice } from "utils";

import { StorageOrderFormBody } from "../StorageOrderFormBody";
import { StorageOrderFormFooter } from "../StorageOrderFormFooter";
import { StorageOrderFormHeader } from "../StorageOrderFormHeader";
import {
  storages,
  updStep,
  useStorageOrderStore,
} from "../storageOrderFormStore";
import styles from "./ConfirmationStep.module.scss";

function ConfirmationStep() {
  const { state, dispatch } = useStorageOrderStore();
  const [agreed, setAgreed] = useState(false);
  const { selectedPlan, storage, upfrontPayment } = state;
  const confirmReq = useRequest(() =>
    apiConfirmOrder().then(() => dispatch(updStep((prev) => prev + 1)))
  );

  const rowsData = [
    { name: "Duration", value: `${selectedPlan?.duration_months} Months` },
    { name: "Price per GB", value: `${selectedPlan?.price_usd_per_gb} $` },
    { name: "Storage", value: `${storages[storage]} GB` },
    { name: "Upfront payment", value: upfrontPayment ? "Yes" : "No" },
  ];

  return (
    <>
      <StorageOrderFormHeader>Confirm your payment</StorageOrderFormHeader>
      <StorageOrderFormBody className={styles.body}>
        <div className={styles.receipt}>
          {rowsData.map((item) => (
            <span className={styles.infoRow}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.price}>{item.value}</span>
            </span>
          ))}
        </div>

        <div className={styles.finalPrice}>
          <span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>
            Total
          </span>
          {calcPrice(
            storages[storage],
            selectedPlan?.price_usd_per_gb,
            upfrontPayment
          )}
          $
        </div>

        <CheckInput
          groupId="terms-and-conditions"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          label={
            <span>
              I agree with{" "}
              <a
                href="https://generator.lorem-ipsum.info/terms-and-conditions"
                target="_blank"
                rel="noreferrer"
              >
                terms and conditions
              </a>
            </span>
          }
        />
      </StorageOrderFormBody>
      <StorageOrderFormFooter
        onPrevClick={true}
        onNextClick={() => confirmReq.exec()}
        nextContent={confirmReq.status.isPending ? "Loading..." : "Confirm"}
        preventDefaultNext
        nextDisabled={!agreed}
      />
    </>
  );
}

export { ConfirmationStep };
