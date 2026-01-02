import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export var Context = createContext<
  [string[], Dispatch<SetStateAction<string[]>>]
>([[], () => null]);

export const useStateProvider = () => useContext(Context);
