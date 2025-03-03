import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Paket = () => {
    const [dataPaket, setPaket] = useState([]);
    const token = localStorage.getItem('token');

    const tampilData = async () => {
        const response = await fetch('http://localhost:3000/api/paket', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setPaket(data);
    }

    useEffect(() => {
        tampilData();
    }, []);

    const handleDelete = (id_paket) => {
        Swal.fire({
            icon: "warning",
            title: "yakin menghapus data?",
            showCancelButton: true,
            confirmButtonText: "yakin",
            cancelButtonText: "batal"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/api/paket/' + id_paket, {
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
                                <h1 className='text-center' style={{ paddingTop: '10px' }}>Data Paket</h1>
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
                                            <th>Nama Paket</th>
                                            <th>Satuan</th>
                                            <th>Harga</th>
                                            <th>Edit</th>
                                            <th>Hapus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPaket.length > 0 ? (
                                            dataPaket.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nama_paket}</td>
                                                    <td>{item.satuan}</td>
                                                    <td>{formatRupiah(item.harga)}</td>
                                                    <td>
                                                        <Link to={`/admin/editpaket/${item.id_paket}`} className='btn btn-warning' style={{borderRadius:'0.5rem'}}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleDelete(item.id_paket)} className='btn btn-danger' style={{borderRadius:'0.5rem'}}>Hapus</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" style={{ textAlign: 'center' }}>Data Kosong</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <Link to="/admin/addpaket" className='btn btn-custom mt-3' style={{background:'#15A3C7',color:'white', borderRadius:'0.5rem'}}>Tambah Paket</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    );
}

export default Paket;