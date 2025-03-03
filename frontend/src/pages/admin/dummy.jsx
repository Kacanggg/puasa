import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const AddPenjualan = () => {
    const token = localStorage.getItem('token');
    const [items, setItems] = useState([{ id_produk: '', jumlah: '' }]);
    const [produkOptions, setProdukOptions] = useState([]);
    const [pelangganOptions, setPelangganOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [produkRes, pelangganRes, userRes] = await Promise.all([
                    fetch("http://localhost:3000/api/produk", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("http://localhost:3000/api/pelanggan", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("http://localhost:3000/api/users", { headers: { Authorization: `Bearer ${token}` } })
                ]);
                
                setProdukOptions(await produkRes.json());
                setPelangganOptions(await pelangganRes.json());
                setUserOptions(await userRes.json());
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        
        fetchData();
    }, [token]);

    const handleItemChange = (index, e) => {
        const values = [...items];
        values[index][e.target.name] = e.target.value;
        setItems(values);
    };

    const handleAddItem = () => {
        setItems([...items, { id_produk: '', jumlah: '' }]);
    };

    const handleRemoveItem = (index) => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {
            id_pelanggan: event.target.id_pelanggan.value,
            id_user: event.target.id_user.value,
            items: items,
            status: status,
        };

        if (!fData.id_pelanggan || !fData.id_user || !fData.items.length) {
            Swal.fire({ icon: "error", text: "Semua data harus diisi, termasuk items", timer: 1000 });
            return;
        }

        const response = await fetch("http://localhost:3000/api/penjualan/", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            Swal.fire({ icon: 'error', text: errorData.message || 'Terjadi kesalahan' });
        } else {
            event.target.reset();
            Swal.fire({ icon: "success", text: "Simpan berhasil", timer: 1000 }).then(() => {
                window.location.href = '/admin/penjualan';
            });
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col">
                            <h1 className="m-0">Data Penjualan</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/admin/penjualan" className="btn btn-primary float-start">Lihat data</Link>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Pilih Pelanggan</label>
                                            <select name="id_pelanggan" className="form-control" required>
                                                <option value="">Pilih Pelanggan</option>
                                                {pelangganOptions.map((pelanggan) => (
                                                    <option key={pelanggan.id} value={pelanggan.id}>
                                                        {pelanggan.id} - {pelanggan.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Pilih User</label>
                                            <select name="id_user" className="form-control" required>
                                                <option value="">Pilih User</option>
                                                {userOptions.map((user) => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.id} - {user.username}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Items</label>
                                            {items.map((item, index) => (
                                                <div key={index} className="input-group mb-2">
                                                    <select name="id_produk" value={item.id_produk} onChange={(e) => handleItemChange(index, e)} className="form-control" required>
                                                        <option value="">Pilih Produk</option>
                                                        {produkOptions.map((produk) => (
                                                            <option key={produk.id} value={produk.id}>
                                                                {produk.id} - {produk.nama_produk}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <input type="number" name="jumlah" placeholder="Jumlah" value={item.jumlah} onChange={(e) => handleItemChange(index, e)} className="form-control" required />
                                                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem(index)}>Hapus</button>
                                                </div>
                                            ))}
                                            <button type="button" className="btn btn-success" onClick={handleAddItem}>Tambah Item</button>
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select name="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Sukses</option>
                                                <option value="Cancelled">Dibatalkan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type='submit' className='btn btn-primary'>Simpan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddPenjualan;