export const getPayments = () => {
    const data = localStorage.getItem('gym_payments');
    return data ? JSON.parse(data) : [];
  };
  
  export const savePayments = (payments) => {
    localStorage.setItem('gym_payments', JSON.stringify(payments));
  };
  