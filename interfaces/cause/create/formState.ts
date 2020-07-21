export interface IformState {
  payment_method?: string;
  payment_account_name?: string;
  payment_account_number?: string;
  summary?: string;
  description?: string;
  affiliated?: any;
  target_amount?: number;
  access?: string;
}

export const formStateDefaultValue = {
  name: "",
  payment_account_name: "",
  payment_account_number: "",
  summary: "",
  description: "",
  affiliated: false,
  access: "public",
};
