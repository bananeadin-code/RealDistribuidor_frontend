import { useLocation } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import EditRegionModal from "./EditRegionModal"
import { getRegionById } from "../../api/RegionAPI"

export default function EditProductData() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const regionId = queryParams.get('editRegion')!

    const { data } = useQuery({
        queryKey: ['Products', regionId],
        queryFn: () => getRegionById(regionId),
        enabled: !!regionId,
        retry: 1
    }) 

  if(data) return <EditRegionModal data={data} regionId={regionId} />
}
