import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AddDetailPesanan = () => {
    const token = localStorage.getItem('token');
    const [orderOptions, setOrderOptions] = useState([]);
    const [paketOptions, setPaketOptions] = useState([]);

    // Ambil data dari API saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data order
                const orderResponse = await fetch("http://localhost:3000/api/pesanan", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const orderData = await orderResponse.json();
                setOrderOptions(orderData);

                // Fetch data paket
                const paketResponse = await fetch("http://localhost:3000/api/paket", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const paketData = await paketResponse.json();
                setPaketOptions(paketData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }

        const response = await fetch("http://localhost:3000/api/detailpesanan", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.log(error => console.error);
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Simpan berhasil",
                timer: 1000
            }).then(res => {
                window.location.href = '/admin/detailpesanan';
            });
        }
    };

    return (
        <section className='content' style={{ background: '#dee9ff', width: '1006px' }}>
            <div className="container" style={{ padding: '20px 0' }}>
                <div className="row">
                    <div className="col">
                        <div className="card" style={{ background: '#fff', maxWidth: '500px', margin: 'auto', padding: '20px 40px', borderRadius: '1.5rem', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.075)' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="card-body registration-form">
                                    <div className="form-icon" style={{ textAlign: 'center', background: '#5891ff', borderRadius: '50%', fontSize: '40px', color: 'white', width: '100px', height: '100px', margin: 'auto', marginBottom: '20px', lineHeight: '100px' }}>
                                        <span><i className='nav-icon fas fa-user' /></span>
                                    </div>
                                    <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Data Detail Pesanan</h2>

                                    {/* Dropdown ID Order */}
                                    <div className="form-group">
                                        <label htmlFor="id_order" style={{ marginLeft: '12px' }}>ID Order</label>
                                        <select name='id_order' className='form-control item' style={{ borderRadius: '1rem' }} required>
                                            <option value="">Pilih Order</option>
                                            {orderOptions.map((order) => (
                                                <option key={order.id_order} value={order.id_order}>
                                                    {order.id_order} - {order.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Dropdown ID Paket */}
                                    <div className="form-group">
                                        <label htmlFor="id_paket" style={{ marginLeft: '12px' }}>Nama Paket</label>
                                        <select name='id_paket' className='form-control item' style={{ borderRadius: '1rem' }} required>
                                            <option value="">Pilih Paket</option>
                                            {paketOptions.map((paket) => (
                                                <option key={paket.id_paket} value={paket.id_paket}>
                                                    {paket.nama_paket} - Rp{paket.harga}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="jumlah" style={{ marginLeft: '12px' }}>Jumlah per kg/item/pcs</label>
                                        <input type="number" name='jumlah' className='form-control item' placeholder="Jumlah" style={{ borderRadius: '1rem' }} required />
                                    </div>
                                </div>
                                <div className="card-footer" style={{ background: 'white' }}>
                                    <button type='submit' className='btn btn-primary btn-block create-account' style={{ borderRadius: '1rem' }}>Tambah</button>
                                    <Link to="/admin/detailpesanan" className='btn btn-secondary btn-block mt-3' style={{ width: '100%', borderRadius: '1rem' }}>Lihat Detail Pesanan</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddDetailPesanan;
