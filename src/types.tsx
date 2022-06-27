export interface IUser {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
}

export interface IProduct {
  _id: string | undefined;
  name: string;
  price: number;
  categoryId: string;
}

export interface IOrderedProducts {
  [key: string]: IProduct[];
}
