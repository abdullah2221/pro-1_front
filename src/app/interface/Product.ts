// export interface Product {
//     id?: number; // Optional for new products
//     name: string;
//     category: string;
//     price: number;
//   }


export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}
