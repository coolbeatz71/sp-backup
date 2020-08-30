import { createContext } from "react";

export interface CatType {
  id: number;
  title: string;
}

export interface SvpType {
  error: string | null;
  categories: CatType[];
}

interface CtxType {
  svpProps: SvpType;
}

const initialValue: CtxType = { svpProps: { error: null, categories: [] } };

const Context = createContext(initialValue);

export default Context;
