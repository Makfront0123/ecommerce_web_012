type OrderType = {
    _id: string,
    user: string,
    status: string,
    total: number,
    shippinAddress: string,
    paymentMethod: string,
    products: ProductType[],
    date: string,
}