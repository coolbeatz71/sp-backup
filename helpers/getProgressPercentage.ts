const getProgressPercentage = (raisedAmount: any, targetAmount: any) => {
  const raised = Number.parseFloat(raisedAmount);
  const target = Number.parseFloat(targetAmount);
  const percent = (raised / target) * 100;
  return percent < 100 ? Math.round(percent) : 100;
};

export default getProgressPercentage;
