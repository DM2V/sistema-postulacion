export type User = {
  id: string;
  identificationNumber: string;
  name?: string;
  lastname?: string;
  password?: string;
  email: string;
  avatar?: string;
  role: string;
};

export interface UserEvaluator {
  id: string;
  identificationNumber: string;
  name?: string;
  lastname?: string;
  password?: string;
  role: string;
}
