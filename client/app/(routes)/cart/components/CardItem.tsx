import { useRouter } from 'next/navigation'
interface CardItemProps {
    product: ProductType
}

export const CardItem = (props: CardItemProps) => {
    const { product } = props
    console.log(product)
    const router = useRouter()
    return (
        <li className="flex py-6 border-b">
            <div onClick={() => router.push(`/product/${product.name}`)}>

            </div>
            <div className="flex justify-between flex-1 px-6">
                <h2 className="text-lg font-bold ">{product.name}</h2>
                <p>{product.price}</p>
                <p className="font-bold">{product.price}</p>
            </div>


        </li>
    )
}
