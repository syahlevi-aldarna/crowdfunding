export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatAmount = (amount: number, decimals = 18): string => {
  return (amount / 10 ** decimals).toFixed(4);
};
