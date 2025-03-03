import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const TransaksiKeuangan = () => {
    const [dataTransaksiKeuangan, setTransaksiKeuangan] = useState([]);
    const token = localStorage.getItem('token');

    const tampilData = async () => {
        const response = await fetch('http://localhost:3000/api/transaksi', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setTransaksiKeuangan(data);
    }

    useEffect(() => {
        tampilData();
    }, []);

    const handleDelete = (id_transaksi) => {
        Swal.fire({
            icon: "warning",
            title: "Yakin menghapus data?",
            showCancelButton: true,
            confirmButtonText: "yakin",
            cancelButtonText: "batal"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/api/transaksi/' + id_transaksi, {
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
    
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0, // Hapus angka di belakang koma
            maximumFractionDigits: 0
        }).format(angka);
    };
    
    

    return (
            <div style={{ backgroundColor: '#dee9ff', minHeight: '100vh' }}>
                <div className="content-header" style={{ padding: '10px 0' }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <h1 className='text-center' style={{ paddingTop: '10px' }}>Data Transaksi Keuangan</h1>
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
                                            <th>ID Order</th>
                                            <th>Jenis Paket</th>
                                            <th>Tanggal</th>
                                            <th>Jenis</th>
                                            <th>Jumlah</th>
                                            <th>Deskripsi</th>
                                            <th>Total Pemasukan</th>
                                            <th>Total Pengeluaran</th>
                                            <th>Saldo</th>
                                            <th>Hapus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTransaksiKeuangan.length > 0 ? (
                                            dataTransaksiKeuangan.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.id_order}</td>
                                                    <td>{item.nama_paket}</td>
                                                    <td>{formatTanggal(item.tanggal)}</td>
                                                    <td>{item.jenis}</td>
                                                    <td>{formatRupiah(item.jumlah)}</td>
                                                    <td>{item.deskripsi}</td>
                                                    <td>{formatRupiah(item.total_pemasukan)}</td>
                                                    <td>{formatRupiah(item.total_pengeluaran)}</td>
                                                    <td>{formatRupiah(item.saldo)}</td>
                                                    <td>
                                                        <button onClick={() => handleDelete(item.id_transaksi)} className='btn btn-danger' style={{borderRadius:'0.5rem'}}>Hapus</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="12" style={{ textAlign: 'center' }}>Data Kosong</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <Link to="/admin/addtransaksi" className='btn btn-custom mt-3' style={{background:'#15A3C7',color:'white', borderRadius:'0.5rem'}}>Tambah Transaksi Keuangan</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    );
}

export default TransaksiKeuangan;