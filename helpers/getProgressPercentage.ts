const getProgressPercentage = (raisedAmount: any, targetAmount: any) => {
  const raised = Number.parseFloat(raisedAmount);
  const target = Number.parseFloat(targetAmount);
  const percent = (raised / target) * 100;
  return Math.round(percent);
};

export default getProgressPercentage;
