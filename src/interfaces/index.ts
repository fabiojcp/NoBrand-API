export interface ICustomerCreate {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ICustomerEdit {
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}