import { useEffect, useRef } from "react";

import { useStatus } from "./useStatus";

type PromiseCallback = (...args: any) => Promise<any>;

type Options<P extends PromiseCallback> = {
  onStart?: () => any;
  onSuccess?: (res: any, ...args: Parameters<P>) => any;
  onFail?: (err: any, ...args: Parameters<P>) => any;
  rejectBeforeFinish?: boolean;
};

export function useRequest<P extends PromiseCallback>(
  promiseCb: P,
  { onStart, onSuccess, onFail, rejectBeforeFinish }: Options<P> = {}
) {
  const mountedRef = useRef(false);
  const status = useStatus();

  useEffect((): any => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const executeRequest = (...args: any) => {
    if (rejectBeforeFinish && status.isPending) return Promise.reject();

    const promise: any = promiseCb?.(...args);

    if (promise instanceof Promise) {
      status.pending();
      onStart?.();
      return new Promise((resolve, reject) =>
        promise?.then?.(
          (res) => {
            if (mountedRef.current === true) {
              status.success(res);
            }
            onSuccess?.(res, ...args);
            resolve?.(res);
          },
          (err) => {
            if (mountedRef.current === true) {
              status.fail(err);
            }
            onFail?.(err, ...args);
            reject(err);
          }
        )
      );
    }

    return Promise.reject(promise);
  };

  return { exec: executeRequest, status };
}
