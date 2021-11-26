import React, { useEffect, useMemo, useReducer } from "react";

import { useRequest } from "hooks";
import { apiGetPlans } from "services/requestService";

import { ConfirmationStep } from "./ConfirmationStep";
import { PaymentStep } from "./PaymentStep";
import styles from "./StorageOrderForm.module.scss";
import {
  initialState,
  reducer,
  storageOrderStoreContext,
  updPlans,
  updSelectedPlan,
} from "./storageOrderFormStore";
import { SubscriptionStep } from "./SubscriptionStep";
import { Success } from "./Success";

export interface SubscriptionPlan {
  duration_months: number;
  price_usd_per_gb: number;
}

function StorageOrderForm(props: React.ComponentPropsWithoutRef<"section">) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step } = state;

  const getPlansReq = useRequest(() =>
    apiGetPlans().then((res) => {
      const plans = res.data.subscription_plans;
      dispatch(updSelectedPlan(plans?.[0]));
      dispatch(updPlans(plans));
    })
  );
  useEffect(() => {
    getPlansReq.exec();
  }, []);

  let stepContent = <SubscriptionStep />;

  if (step === 1) {
    stepContent = <PaymentStep />;
  }
  if (step === 2) {
    stepContent = <ConfirmationStep />;
  }
  if (step === 3) {
    stepContent = <Success />;
  }

  const contextVal = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <storageOrderStoreContext.Provider value={contextVal}>
      <section {...props} className={styles.container}>
        {stepContent}
      </section>
    </storageOrderStoreContext.Provider>
  );
}

export { StorageOrderForm };
