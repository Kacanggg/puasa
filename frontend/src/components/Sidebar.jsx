import React from 'react'
import Logo from "../../public/dist/img/user2-160x160.jpg"
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

const Sidebar = () => {
    const role = localStorage.getItem('role'); // Ambil role dari localStorage

    const Logout = () => {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.href = "/";
                Swal.fire({
                    icon: 'success',
                    title: 'Logged out successfully',
                    text: 'You have been logged out.',
                    timer: 1500
                });
            }
        });
    };

    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <NavLink to="/admin/dashboard" className="brand-link">
                    <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Laundry</span>
                </NavLink>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={Logo} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Risky</a>
                        </div>
                    </div>
                    {/* SidebarSearch Form */}
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" role="menu" >
                            <li className="nav-item menu-open">
                                <a href="dashboard" className="nav-link" activeClassName="active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <NavLink to="paket" className="nav-link" activeclassname="active">
                                    <i className="nav-icon fas fa-list-alt" />
                                    <p>
                                        Paket
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="pelanggan" className="nav-link" activeclassname="active">
                                    <i className="nav-icon fas fa-users" />
                                    <p>
                                        Pelanggan
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="pesanan" className="nav-link" activeclassname="active">
                                    <i className="nav-icon fas fa-shopping-basket" />
                                    <p>
                                        Pesanan
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="detailpesanan" className="nav-link" activeclassname="active">
                                    <i className="nav-icon fas fa-info " />
                                    <p>
                                        Detail Pesanan
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="transaksikeuangan" className="nav-link" activeclassname="active">
                                    <i className="nav-icon fas fa-solid fa-dollar-sign" />
                                    <p>
                                        Keuangan
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/user" className="nav-link" activeclassname="active">
                                    <i className="nav-icon fas fa-solid fa-user" />
                                    <p>
                                        User
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClickCapture={Logout} to="/logout" className="nav-link">
                                    <i className="nav-icon fas fa-arrow-circle-right" />
                                    <p>
                                        Logout
                                    </p>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </>
    )
}

export default Sidebar
