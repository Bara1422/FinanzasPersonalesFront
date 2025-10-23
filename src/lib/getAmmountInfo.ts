export const getAmountInfo = ({amount, tipo}: {amount: number, tipo: 'INGRESO' | 'GASTO' | 'BALANCE'}) => {
    let color = '';
    let formattedAmount = '';

    switch (tipo) {
      case 'INGRESO':
        color = 'text-green-500';
        formattedAmount = `+ $${amount.toFixed(2)}`;
        break;
      case 'GASTO':
        color = 'text-red-500';
        formattedAmount = `- $${amount.toFixed(2)}`;
        break;
      case 'BALANCE':
        color = amount >= 0 ? 'text-green-500' : 'text-red-500';
        formattedAmount =
          amount > 0
            ? `+ $${amount.toFixed(2)}`
            : `- $${Math.abs(amount).toFixed(2)}`;
        break;
      default:
        color = 'text-black';
        formattedAmount = `$${amount.toFixed(2)}`;
    }

    return { color, formattedAmount };
  };