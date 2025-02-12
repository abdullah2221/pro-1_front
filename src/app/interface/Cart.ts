export interface CartRequest {
    user_id: number;
    product_id: number;
    quantity: number;
}


export interface CartItem {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    product_name: string;
    product_price: number;
}

export interface CartResponse{
    cart_items?: CartItem[];
    user_id?: number;
}