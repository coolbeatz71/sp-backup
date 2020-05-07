
export const getColor = (planType: string): string => {
  switch (planType) {
    case "free plan":
      return "#6881FB";
    case "standard":
      return "#5DD8FD";
    case "premium":
      return "#B776FC";
    default:
      return "#6881FB";
  }
};

export const getPlanFee = (planType: string): string => {
  switch (planType) {
    case "free plan":
      return "free";
    case "standard":
      return "5,000 RWF";
    case "premium":
      return "20,000 RWF";
    default:
      return "free";
  }
};

export const getIcon = (planType: string): string => {
  switch (planType) {
    case "free plan":
      return "icons/free.png";
    case "standard":
      return "icons/standard.png";
    case "premium":
      return "icons/premium.png";
    default:
      return "icons/free.png";
  }
};
