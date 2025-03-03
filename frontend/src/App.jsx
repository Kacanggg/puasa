import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Dashboard from './pages/admin/Dashboard'
import DashboardKaryawan from "./pages/karyawan/DashboardKaryawan"
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import ProtectedRoute from "./components/ProtectedRoute"

import User from './pages/admin/User';
import Paket from './pages/admin/Paket';
import Pelanggan from './pages/admin/Pelanggan';
import Pesanan from './pages/admin/Pesanan';
import DetailPesanan from './pages/admin/DetailPesanan';
import TransaksiKeuangan from './pages/admin/TransaksiKeuangan';

import EditUser from './pages/admin/EditUser';
import EditPesanan from './pages/admin/EditPesanan';
import EditDetailPesanan from './pages/admin/EditDetailPesanan';
import EditPelanggan from './pages/admin/EditPelanggan';
import EditPaket from './pages/admin/EditPaket';

import AddPaket from './pages/admin/AddPaket';
import AddPelanggan from './pages/admin/AddPelanggan';
import AddUser from './pages/admin/AddUser';
import AddPesanan from './pages/admin/AddPesanan';
import AddDetailPesanan from './pages/admin/AddDetailPesanan';
import AddTransaksi from './pages/admin/AddTransaksi';

function App() {

  let isLoggedIn = false

  const token = localStorage.getItem('token')

  if (token !== null) {
    isLoggedIn = true
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
            <Route path="/admin/" element={isLoggedIn ? <Layout />: <Login/>}>

              <Route path="dashboard" element={isLoggedIn ? <Dashboard />: <Login/>} />
              <Route path="user" element={isLoggedIn ? <User />: <Login/>} />
              <Route path="paket" element={isLoggedIn ? <Paket />: <Login/>} />
              <Route path="pelanggan" element={isLoggedIn ? <Pelanggan />: <Login/>} />
              <Route path="pesanan" element={isLoggedIn ? <Pesanan />: <Login/>} />
              <Route path="detailpesanan" element={isLoggedIn ? <DetailPesanan />: <Login/>} />
              <Route path="transaksikeuangan" element={isLoggedIn ? <TransaksiKeuangan />: <Login/>} />

              <Route path="addpelanggan" element={isLoggedIn ? <AddPelanggan />: <Login/>} />
              <Route path="addpaket" element={isLoggedIn ? <AddPaket />: <Login/>} />
              <Route path="addpesanan" element={isLoggedIn ? <AddPesanan />: <Login/>} />
              <Route path="adddetailspesanan" element={isLoggedIn ? <AddDetailPesanan/> : <Login/>} />
              <Route path="adduser" element={isLoggedIn ? <AddUser />: <Login/>} />
              <Route path="addtransaksi" element={isLoggedIn ? <AddTransaksi />: <Login/>} />

              <Route path="edituser/:id_user" element={isLoggedIn ? <EditUser />: <Login/>} />
              <Route path="editpesanan/:id_order" element={isLoggedIn ? <EditPesanan />: <Login/>} />
              <Route path="editdetailpesanan/:id_orderdetails" element={isLoggedIn ? <EditDetailPesanan />: <Login/>} />
              <Route path="editpelanggan/:id_customer" element={isLoggedIn ? <EditPelanggan />: <Login/>} />
              <Route path="editpaket/:id_paket" element={isLoggedIn ? <EditPaket />: <Login/>} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["karyawan"]}/>}>
            <Route path="/karyawan/" element={isLoggedIn ? <Layout/>: <Login/>}>
              <Route path="dashboardkaryawan" element={<DashboardKaryawan/>}/>
              <Route path="dashboard" element={isLoggedIn ? <Dashboard />: <Login/>} />
              <Route path="user" element={isLoggedIn ? <User />: <Login/>} />
              <Route path="paket" element={isLoggedIn ? <Paket />: <Login/>} />
              <Route path="pelanggan" element={isLoggedIn ? <Pelanggan />: <Login/>} />
              <Route path="pesanan" element={isLoggedIn ? <Pesanan />: <Login/>} />
              <Route path="detailpesanan" element={isLoggedIn ? <DetailPesanan />: <Login/>} />
              <Route path="transaksikeuangan" element={isLoggedIn ? <TransaksiKeuangan />: <Login/>} />

              <Route path="addpelanggan" element={isLoggedIn ? <AddPelanggan />: <Login/>} />
              <Route path="addpaket" element={isLoggedIn ? <AddPaket />: <Login/>} />
              <Route path="addpesanan" element={isLoggedIn ? <AddPesanan />: <Login/>} />
              <Route path="adddetailspesanan" element={isLoggedIn ? <AddDetailPesanan/> : <Login/>} />
              <Route path="adduser" element={isLoggedIn ? <AddUser />: <Login/>} />
              <Route path="addtransaksi" element={isLoggedIn ? <AddTransaksi />: <Login/>} />

              <Route path="edituser/:id_user" element={isLoggedIn ? <EditUser />: <Login/>} />
              <Route path="editpesanan/:id_order" element={isLoggedIn ? <EditPesanan />: <Login/>} />
              <Route path="editdetailpesanan/:id_orderdetails" element={isLoggedIn ? <EditDetailPesanan />: <Login/>} />
              <Route path="editpelanggan/:id_customer" element={isLoggedIn ? <EditPelanggan />: <Login/>} />
              <Route path="editpaket/:id_paket" element={isLoggedIn ? <EditPaket />: <Login/>} />
            </Route>
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


{/* <Route path="detailpenjualan" element={isLoggedIn ? <DetailPenjualan/> : <Login />}></Route> */}
export default App
