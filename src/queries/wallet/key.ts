export const walletKeys = {
  all: ['wallet'] as const,
  list: () => [...walletKeys.all, 'list'] as const,
};
