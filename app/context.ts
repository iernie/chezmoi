import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export var Context = createContext<
  [number[], Dispatch<SetStateAction<number[]>>]
>([[], () => null]);

export const useStateProvider = () => useContext(Context);
