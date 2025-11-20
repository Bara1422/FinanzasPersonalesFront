export const getAmountInfo = ({
  amount,
  tipo,
}: {
  amount: number;
  tipo: 'INGRESO' | 'GASTO' | 'BALANCE' | 'TRANSACCION';
}) => {
  let color = '';
  let formattedAmount = '';

  switch (tipo) {
    case 'INGRESO':
      color = 'text-green-500';
      formattedAmount = `$${amount.toLocaleString()}`;
      break;
    case 'GASTO':
      color = 'text-red-500';
      formattedAmount = `$${amount.toLocaleString()}`;
      break;
    case 'BALANCE':
      color = amount >= 0 ? 'text-green-500' : 'text-red-500';
      formattedAmount = `$${Math.abs(amount).toLocaleString()}`;
      break;
    case 'TRANSACCION':
      color = 'text-black-500';
      formattedAmount = `${amount.toLocaleString()}`;
      break;
    default:
      color = 'text-black';
      formattedAmount = `$${amount.toLocaleString()}`;
  }

  return { color, formattedAmount };
};
