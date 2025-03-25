export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const isValidAmount = (amount: string): boolean => {
  return !isNaN(Number(amount)) && Number(amount) > 0;
};
