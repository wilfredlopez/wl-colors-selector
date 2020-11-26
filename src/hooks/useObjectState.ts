import { useState, useCallback } from 'react'

type SetStateOption<S, T> = [(current: S) => Partial<T>] | [Partial<T>]

type ReturnStateType<S, T> = [
  state: S,
  setState: (...args: SetStateOption<S, T>) => void,
  resetState: (newState: S) => void
]

// type DeepPartial<T> = {
//   [P in keyof T]?: DeepPartial<T[P]>
// }

// export const useObjectState = <T extends {}>
export function useObjectState<T extends {}>(
  initialState: T
): ReturnStateType<T, T>
export function useObjectState<T extends {}>(
  initialState?: T
): ReturnStateType<T | Partial<T>, T>
export function useObjectState<T extends {}>(initialState?: T) {
  const [state, _set] = useState<
    typeof initialState extends infer C
      ? C extends undefined
        ? Partial<T>
        : C
      : T
  >(initialState ?? ({} as any))

  function resetState(newState: typeof state) {
    _set(newState)
  }
  const setState = useCallback((...args: SetStateOption<typeof state, T>) => {
    const [newState] = args
    _set(current =>
      Object.assign(
        {},
        current,
        typeof newState === 'function' ? newState(current) : newState
      )
    )
  }, [])

  return [state, setState, resetState]
}
