// Loadableの各状態と付随するプロパティの型定義
type LoadableState<T> =
  | {
      status: "pending";
      promise: Promise<T>;
    }
  | {
      status: "fulfilled";
      data: T;
    }
  | {
      status: "rejected";
      error: unknown;
    };

/**
 * Loadableクラス
 * PromiseをラップしてSuspenseで使用できるようにしている
 */
class Loadable<T> {
  #state: LoadableState<T>;
  constructor(promise: Promise<T>) {
    this.#state = {
      status: "pending",
      promise: promise.then(
        (data) => {
          this.#state = {
            status: "fulfilled",
            data,
          };
          return data;
        },
        (error) => {
          this.#state = {
            status: "rejected",
            error,
          };
          throw error;
        }
      ),
    };
  }
  // Suspenseに用いるためfulfilled以外はThrowを行う
  getOrThrow(): T {
    switch (this.#state.status) {
      case "pending":
        throw this.#state.promise;
      case "fulfilled":
        return this.#state.data;
      case "rejected":
        throw this.#state.error;
    }
  }
}

export default Loadable;