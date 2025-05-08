export const getCustomers = () => {
    const data = localStorage.getItem('gym_customers');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveCustomers = (customers) => {
    localStorage.setItem('gym_customers', JSON.stringify(customers));
  };
  