import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditPesanan = () => {
    const { id_order } = useParams();
    const [id_customer, setIdCustomer] = useState('');
    const [id_user, setIdUser] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [status, setStatus] = useState('');
    const [metode_pembayaran, setMetodePembayaran] = useState('');
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    
    const token = localStorage.getItem('token');

    useEffect(() => {
        getOrder();
        getCustomers();
        getUsers();
    }, []);

    const getOrder = async () => {
        const response = await fetch(`http://localhost:3000/api/pesanan/${id_order}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setIdCustomer(data.id_customer);
        setIdUser(data.id_user);
        setTanggalSelesai(data.tanggal_selesai);
        setStatus(data.status);
        setMetodePembayaran(data.metode_pembayaran);
    };

    const getCustomers = async () => {
        const response = await fetch(`http://localhost:3000/api/pelanggan`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setCustomers(data);
    };

    const getUsers = async () => {
        const response = await fetch(`http://localhost:3000/api/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUsers(data);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedData = { id_customer, id_user, tanggal_selesai, status, metode_pembayaran };
        
        const response = await fetch(`http://localhost:3000/api/pesanan/${id_order}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(updatedData)
            
        });
        
        
        if (response.ok) {
            Swal.fire({ icon: "success", text: "Update berhasil", timer: 1000 }).then(() => {
                window.location.href = '/admin/pesanan';
            });
        } else {
            Swal.fire({ icon: "error", text: "Terjadi kesalahan" });
        }
    };

    return (
        <section className='content' style={{ background: '#fff', width: '100%', padding: '20px' }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card" style={{ background: '#fff', maxWidth: '500px', margin: 'auto', padding: '20px 40px', borderRadius: '1.5rem', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.075)' }}>
                            <form onSubmit={handleUpdate}>
                                <div className="card-body">
                                    <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Edit Pesanan</h2>

                                    {/* Dropdown Pilih Pelanggan */}
                                    <div className="form-group">
                                        <label htmlFor="id_customer">Pilih Pelanggan</label>
                                        <select className="form-control" value={id_customer} onChange={(e) => setIdCustomer(e.target.value)}>
                                            <option value="">-- Pilih Pelanggan --</option>
                                            {customers.map((customer) => (
                                                <option key={customer.id_customer} value={customer.id_customer}>{customer.nama}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Dropdown Pilih User */}
                                    <div className="form-group">
                                        <label htmlFor="id_user">Pilih User</label>
                                        <select className="form-control" value={id_user} onChange={(e) => setIdUser(e.target.value)}>
                                            <option value="">-- Pilih User --</option>
                                            {users.map((user) => (
                                                <option key={user.id_user} value={user.id_user}>{user.nama}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Input Tanggal Selesai */}
                                    <div className="form-group">
                                        <label htmlFor="tanggal_selesai">Tanggal Selesai</label>
                                        <input type="date" value={tanggal_selesai} onChange={(e) => setTanggalSelesai(e.target.value)} className='form-control' />
                                    </div>

                                    {/* Dropdown Status */}
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <select className='form-control' value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="proses">Proses</option>
                                            <option value="selesai">Selesai</option>
                                            <option value="sudah diambil">Sudah Diambil</option>
                                        </select>
                                    </div>

                                    {/* Dropdown Metode Pembayaran */}
                                    <div className="form-group">
                                        <label htmlFor="metode_pembayaran">Metode Pembayaran</label>
                                        <select className='form-control' value={metode_pembayaran} onChange={(e) => setMetodePembayaran(e.target.value)}>
                                            <option value="tunai">Tunai</option>
                                            <option value="transfer">Transfer</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Tombol Simpan */}
                                <div className="card-footer" style={{ background: 'white', marginTop: '-20px' }}>
                                    <button type='submit' className='btn btn-primary' style={{ borderRadius: '1rem', width: '100%' }}>Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditPesanan;