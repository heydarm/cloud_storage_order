import React, { useContext } from "react";

import { SubscriptionPlan } from ".";

export const storages = [5, 10, 50];

const today = new Date();
export const initialState = {
  step: 0,
  plans: [] as SubscriptionPlan[],
  selectedPlan: null as SubscriptionPlan | null,
  storage: 0 as number,
  upfrontPayment: false,
  cardNumber: "",
  cardExpiration: {
    month: Number(today.getMonth() + 1) as number | null,
    year: Number((today.getFullYear() + 3).toString().slice(-2)) as
      | number
      | null,
  },
  cvv: null as number | null,
};

export type State = typeof initialState;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPD_PLANS":
      return { ...state, plans: action.payload };
    case "UPD_STEP":
      return {
        ...state,
        step:
          typeof action.payload === "function"
            ? action.payload(state.step)
            : action.payload,
      };
    case "UPD_SELECTED_PLAN":
      return { ...state, selectedPlan: action.payload };
    case "UPD_STORAGE":
      return { ...state, storage: action.payload };
    case "UPD_UPFRONT_PAYMENT":
      return { ...state, upfrontPayment: action.payload };
    case "UPD_CARD_NUMBER":
      return { ...state, cardNumber: action.payload };
    case "UPD_CARD_EXPIRATION":
      return { ...state, cardExpiration: action.payload };
    case "UPD_CARD_CVV":
      return { ...state, cvv: action.payload };
    default:
      throw new Error("Not such action");
  }
};

export const storageOrderStoreContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

export const useStorageOrderStore = () => useContext(storageOrderStoreContext);

// Actions
export const updPlans = (plans: SubscriptionPlan[]) => ({
  type: "UPD_PLANS" as const,
  payload: plans,
});

export const updStep = (step: number | ((prev: number) => number)) => ({
  type: "UPD_STEP" as const,
  payload: step,
});

export const updSelectedPlan = (plan: SubscriptionPlan) => ({
  type: "UPD_SELECTED_PLAN" as const,
  payload: plan,
});

export const updStorage = (storageIndex: number) => ({
  type: "UPD_STORAGE" as const,
  payload: storageIndex,
});

export const updUpfrontPayment = (value: boolean) => ({
  type: "UPD_UPFRONT_PAYMENT" as const,
  payload: value,
});

export const updCardNumber = (value: string) => ({
  type: "UPD_CARD_NUMBER" as const,
  payload: value,
});

export const updCardExpiration = (
  month: number | null,
  year: number | null
) => ({
  type: "UPD_CARD_EXPIRATION" as const,
  payload: { month, year },
});

export const updCardCVV = (cvv: number | null) => ({
  type: "UPD_CARD_CVV" as const,
  payload: cvv,
});

export type Action =
  | ReturnType<typeof updPlans>
  | ReturnType<typeof updStep>
  | ReturnType<typeof updSelectedPlan>
  | ReturnType<typeof updStorage>
  | ReturnType<typeof updUpfrontPayment>
  | ReturnType<typeof updCardNumber>
  | ReturnType<typeof updCardExpiration>
  | ReturnType<typeof updCardCVV>;
