export interface Product{
    productId: string;
    name: string;
    manufacturer: string;
    category: string;
    price: number;
    description: string;
    attributes: {
        color: string;
        material?: string;
    }
}