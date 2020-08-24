import { createContext } from "react";

interface CatType {
  id: number;
  title: string;
}

interface SvpType {
  error: string | null;
  categories: CatType[];
}

interface CtxType {
  svpProps: SvpType;
}

const initialValue: CtxType = { svpProps: { error: null, categories: [] } };

const Context = createContext(initialValue);

export default Context;
