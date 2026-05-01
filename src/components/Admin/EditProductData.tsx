import { useLocation } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import EditProductModal from "./EditProductModal"
import { getProductById } from "../../api/ProductAPI"

export default function EditProductData() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const productId = queryParams.get('editProduct')!

    const { data } = useQuery({
        queryKey: ['Products', productId],
        queryFn: () => getProductById(productId),
        enabled: !!productId,
        retry: 1
    }) 

  if(data) return <EditProductModal data={data} productId={productId} />
}
