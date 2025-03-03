import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Pesanan = () => {
    const [dataPesanan, setPesanan] = useState([]);
    const token = localStorage.getItem('token');

    const tampilData = async () => {
        const response = await fetch('http://localhost:3000/api/pesanan', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setPesanan(data);
    }

    useEffect(() => {
        tampilData();
    }, []);

    const handleDelete = (id_order) => {
        Swal.fire({
            icon: "warning",
            title: "yakin menghapus data?",
            showCancelButton: true,
            confirmButtonText: "yakin",
            cancelButtonText: "batal"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/api/pesanan/' + id_order, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then(response => response.json())
                    .then(res => {
                        window.location.reload();
                    });
            }
        });
    }

    // Fungsi untuk memformat tanggal
    const formatTanggal = (tanggal) => {
        if (!tanggal) return "-"; // Jika tidak ada tanggal, tampilkan "-"
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(tanggal));
    };
    
    return (
            <div style={{ backgroundColor: '#dee9ff', minHeight: '100vh' }}>
                <div className="content-header" style={{ padding: '10px 0' }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <h1 className='text-center' style={{ paddingTop: '10px' }}>Data Pesanan</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='content' style={{ padding: '10px 20px' }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <table className='table table-striped mt-2' style={{ borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0px 2px 10px rgba(0, 0.3, 0, 0.3)' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#15A3C7', color: 'white' }}>
                                            <th>No</th>
                                            <th>Nama Pelanggan</th>
                                            <th>User</th>
                                            <th>Tanggal Masuk</th>
                                            <th>Tanggal Selesai</th>
                                            <th>Status</th>
                                            <th>Metode Pembayaran</th>
                                            <th>Edit</th>
                                            <th>Hapus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPesanan.length > 0 ? (
                                            dataPesanan.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nama}</td>
                                                    <td>{item.user}</td>
                                                    <td>{formatTanggal(item.tanggal_masuk)}</td>
                                                    <td>{formatTanggal(item.tanggal_selesai)}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.metode_pembayaran}</td>
                                                    <td>
                                                        <Link to={`/admin/editpesanan/${item.id_order}`} className='btn btn-warning' style={{borderRadius:'0.5rem'}}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleDelete(item.id_order)} className='btn btn-danger' style={{borderRadius:'0.5rem'}}>Hapus</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: 'center' }}>Data Kosong</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <Link to="/admin/addpesanan" className='btn btn-custom mt-3' style={{background:'#15A3C7',color:'white', borderRadius:'0.5rem'}}>Tambah Pesanan</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    );
}

export default Pesanan;
