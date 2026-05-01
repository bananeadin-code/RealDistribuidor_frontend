import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import LoginLayout from './layouts/LoginLayout'
import AdminView from './views/admin/AdminView'
import AdminProductsView from './views/admin/AdminProductsView'
import LoginView from './views/login/LoginView'
import AddAdminView from './views/admin/AddAdminView'
import ClientLayout from './layouts/ClientLayout'
import DashboardView from './views/client/DashboardView'
import CartView from './views/client/CartView'
import AdminOrdersView from './views/admin/AdminOrdersView'
import AdminManageRegionsView from './views/admin/AdminManageRegionsView'
import RegionFormView from './views/admin/RegionFormView'
export default function Router(){

    return (
        <BrowserRouter>
             <Routes>
                <Route element={<AdminLayout />}> {/* Admin Layout */}
                    <Route path="/admin-view-privated" element={<AdminView /> } />
                    <Route path="/admin-view-privated/products" element={<AdminProductsView /> } />
                    <Route path="/admin-view-privated/orders" element={<AdminOrdersView /> } />
                    <Route path="/admin-view-privated/create-admin" element={<AddAdminView /> } />
                    <Route path="/admin-view-privated/manage-regions" element={<AdminManageRegionsView /> } />
                    <Route path="/admin-view-privated/manage-regions/create" element={<RegionFormView /> } />
                </Route>
                <Route element={<LoginLayout />}> {/* Login Layout */}
                    <Route path="/admin-view-privated/login" element={<LoginView /> } />
                </Route>
                <Route element={<ClientLayout />}> {/* Client Layout */}
                    <Route path="/" element={<DashboardView /> } />
                    <Route path="/cart" element={<CartView /> } />
                </Route>
             </Routes>
        </BrowserRouter>
    )
}