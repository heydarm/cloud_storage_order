import { useEffect, useRef } from "react";

import { useStatus } from "./useStatus";

type PromiseCallback = (...args: any) => Promise<any>;

type Options = {
  rejectBeforeFinish?: boolean;
};

export function useRequest(
  promiseCb: PromiseCallback,
  { rejectBeforeFinish }: Options = {}
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
      return promise?.then?.(
        (res) => {
          if (mountedRef.current === true) {
            status.success(res);
          }
        },
        (err) => {
          if (mountedRef.current === true) {
            status.fail(err);
          }
        }
      );
    }

    return Promise.reject(promise);
  };

  return { exec: executeRequest, status };
}
