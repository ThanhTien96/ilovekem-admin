export interface AccountType {
  avatar: {
    src: string;
    fileName: string;
  };
  readonly _id: string;
  userName: string;
  fullName: string;
  email: string;
  numberPhone: string;
  address: string;
  userType: {
    _id: string;
    typeName: string;
    role: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AccountTypeFromBE {
  data: AccountType;
}

export interface TableDataType {
  key: string;
  avatar: {
    src: string;
    fileName: string;
  };
  userName: string;
  name: string;
  userType: {
    _id: string;
    typeName: string;
    role: number;
  };
  email: string;
  phone: string;
  address: string;
  action: string;
}

export interface TypeOfUserType {
  _id: string;
  typeName: string;
  role: 1;
}
