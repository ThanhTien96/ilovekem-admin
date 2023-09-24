
export interface MediaType {
  fileName: string;
  src: string;
  _id: string;
}

export interface ProductType {
    _id: string;
    productName: string;
    description: string;
    media?:  MediaType[];
    originalPrice: number;
    overwritePrice: number;
    sortDescription: string;
    rate: number;
    productType: {
      _id: string;
      typeName: string;
      role: number;
      products: string[];
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  }


export interface ProductTypeFromBE {
  data: ProductType[];
  total: number;
  totalPage: number;
  currentPages: string;
}
