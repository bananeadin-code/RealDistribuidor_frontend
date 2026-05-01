import { useQuery } from "@tanstack/react-query"
import { getRegions } from "../../api/RegionAPI"
import RegionDetails from "../../components/Admin/RegionDetails"
import { useNavigate } from "react-router-dom"
import EditRegionData from '../../components/Admin/EditRegionData'


export default function AdminManageRegionsView() {

  const navigate = useNavigate()
  const { data: regions, isLoading } = useQuery({
    queryKey: ['Region'],
    queryFn: getRegions
  })

  if(isLoading) return 'Loading...'

  if(regions) return (
    <>
     <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-blue-900 tracking-tight">
          Regions fees
        </h1>
        <button
          onClick={() => navigate('/admin-view-privated/manage-regions/create')}
          className="py-2 px-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold text-lg"
        >
          Add Region
        </button>
      </div>
 
      {/* Table */}
      <div className="p-2">
        <table className="w-full mt-2 table-auto">
          {/* Desktop thead */}
          <thead className="hidden md:table-header-group bg-linear-to-r from-blue-500 to-sky-500 text-white rounded-xl overflow-hidden">
            <tr className="hidden md:table-row">
              <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider w-20">
                Code
              </th>
              <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Region / State
              </th>
              <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Delivery fee
              </th>
              <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
 
          <tbody className="block md:table-row-group">
            {regions.map( region => (
              <RegionDetails key={region._id} region={region} />
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <EditRegionData />
  </>
  )
}
