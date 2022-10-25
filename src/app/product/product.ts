export interface Product {
    _id: string,
    title: string,
    price: number | string,
    image: string | File,
    description: string
}