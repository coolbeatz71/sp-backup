export default {
  changeName: {
    currentName: "Someone",
    error: "",
    loading: false,
  },
};

export interface Iexample {
  changeName: {
    currentName: string;
    error: string;
    loading: boolean;
  };
}
