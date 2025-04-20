export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string;
    image: string | undefined;
    created_at: string;
    updated_at: string;
}

export interface ProductState {
    products: Product[];
    product: Product | null;
    loading: boolean;
    error: string | null;
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    search: string;
}
export interface ProductPayload {
    [x: string]: any;
    name: string;
    price: number | string;
    description: string | null;
    image: string | null;
}
