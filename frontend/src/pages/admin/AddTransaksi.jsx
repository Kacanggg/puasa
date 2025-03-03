import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AddTransaksi = () => {
    const token = localStorage.getItem('token');
    const [orders, setOrders] = useState([]);
    const [pakets, setPakets] = useState([]);
    const [jenis, setJenis] = useState("Pemasukan");
    const [selectedOrder, setSelectedOrder] = useState("");
    const [selectedPaket, setSelectedPaket] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [deskripsi, setDeskripsi] = useState("");


    useEffect(() => {
        // Fetch ID Order
        fetch("http://localhost:3000/api/pesanan", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err));

        // Fetch ID Paket
        fetch("http://localhost:3000/api/paket", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setPakets(data))
            .catch(err => console.error(err));
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {
            id_order: selectedOrder ? selectedOrder : null, // Pastikan NULL jika tidak dipilih
            id_paket: selectedPaket ? selectedPaket : null, // Pastikan NULL jika tidak dipilih
            jenis,
            jumlah,
            deskripsi,
        };
        console.log(fData)

        const response = await fetch("http://localhost:3000/api/transaksi", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Simpan berhasil",
                timer: 1000
            }).then(() => {
                window.location.href = '/admin/transaksikeuangan';
            });
        }
    }

    return (
        <>
            <section className='content' style={{ background: '#dee9ff', width: '1006px' }}>
                <div className="container" style={{ padding: '20px 0' }}>
                    <div className="row">
                        <div className="col">
                            <div className="card" style={{ background: '#fff', maxWidth: '500px', margin: 'auto', padding: '20px 40px', borderRadius: '1.5rem', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.075)' }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body registration-form">
                                        <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Data Transaksi</h2>
                                        <div className="form-group">
                                            <label htmlFor="id_order">ID Order</label>
                                            <select
                                                name='id_order'
                                                className='form-control item'
                                                value={selectedOrder}
                                                onChange={(e) => setSelectedOrder(e.target.value)}
                                            >
                                                <option value="">Pilih ID Order</option>
                                                {orders.map(pesanan => (
                                                    <option key={pesanan.id_order} value={pesanan.id_order}>{pesanan.id_order}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_paket">Jenis Paket</label>
                                            <select
                                                name='id_paket'
                                                className='form-control item'
                                                value={selectedPaket}
                                                onChange={(e) => setSelectedPaket(e.target.value)}
                                            >
                                                <option value="">Pilih Jenis Paket</option>
                                                {pakets.map(paket => (
                                                    <option key={paket.id_paket} value={paket.id_paket}>{paket.nama_paket}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="jenis">Jenis</label>
                                            <select name='jenis' className='form-control item' value={jenis} onChange={(e) => setJenis(e.target.value)} required>
                                                <option value="pemasukan">Pemasukan</option>
                                                <option value="pengeluaran">Pengeluaran</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="jumlah">Jumlah Nominal</label>
                                            <input type="number" name='jumlah' className='form-control item' placeholder="Jumlah" value={jumlah} onChange={(e) => setJumlah(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="deskripsi">Deskripsi</label>
                                            <input type="text" name='deskripsi' className='form-control item' placeholder="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="card-footer" style={{ background: 'white' }}>
                                        <button type='submit' className='btn btn-primary btn-block create-account' style={{ borderRadius: '1rem' }}>Tambah</button>
                                        <Link to="/admin/transaksikeuangan" className='btn btn-secondary btn-block mt-3' style={{ width: '100%', borderRadius: '1rem' }}>Lihat Transaksi Keuangan</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddTransaksi;