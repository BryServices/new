export const formatFCFA = (n: number): string => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
};
