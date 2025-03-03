import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AddPesanan = () => {
    const token = localStorage.getItem('token');
    const [pelangganOptions, setPelangganOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [paketOptions, setPaketOptions] = useState([]);
    const [status, setStatus] = useState("Pending");
    const [metodePembayaran, setMetodePembayaran] = useState("");
    const [jumlah, setJumlah] = useState(1);
    const [selectedPaket, setSelectedPaket] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pelangganRes, userRes,paketRes] = await Promise.all([
                    fetch("http://localhost:3000/api/pelanggan", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("http://localhost:3000/api/users", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("http://localhost:3000/api/paket", { headers: { Authorization: `Bearer ${token}` } })
                ]);

                setPelangganOptions(await pelangganRes.json());
                setUserOptions(await userRes.json());
                setPaketOptions(await paketRes.json());
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const rawDate = event.target.tanggal_selesai.value;
        const formattedDate = new Date(rawDate).toISOString().split("T")[0];
        const selectedPaketData = paketOptions.find(p => p.id_paket == selectedPaket);
        const fData = {
            id_customer: event.target.id_customer.value,
            id_user: event.target.id_user.value,
            tanggal_selesai: formattedDate,
            status: status,
            metode_pembayaran: metodePembayaran,
            id_paket: selectedPaketData.id_paket,
            jumlah: jumlah,
            
        };
    
        if (!fData.id_customer || !fData.id_user || !fData.tanggal_selesai || !fData.metode_pembayaran || !selectedPaket || jumlah <= 0) {
            Swal.fire({ icon: "error", text: "Semua data harus diisi!", timer: 1000 });
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/api/pesanan", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(fData),
            });
    
            if (!response.ok) {
                throw new Error("Gagal menyimpan pesanan");
            }
    
            const pesananData = await response.json();
            const id_order = pesananData.insertId; // Perbaikan
    
            console.log("✅ Pesanan berhasil dibuat:", pesananData);
    
            // Ambil detail paket yang dipilih
            const selectedPaketData = paketOptions.find(p => p.id_paket == selectedPaket);
    
            const detailData = {
                id_order: id_order,
                id_paket: selectedPaketData.id_paket,
                jumlah: jumlah,
            };
    
            console.log("📌 Mengirim detail pesanan:", detailData);
    
            const detailResponse = await fetch("http://localhost:3000/api/detailpesanan", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(detailData),
            });
    
            Swal.fire({ icon: "success", text: "Simpan berhasil", timer: 1000 }).then(() => {
                window.location.href = '/admin/pesanan';
            });
    
        } catch (error) {
            Swal.fire({ icon: "error", text: error.message || "Terjadi kesalahan" });
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
                                    <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Data Pesanan</h2>
                                    <div className="form-group">
                                        <label>Pilih Pelanggan</label>
                                        <select name="id_customer" className="form-control" required>
                                            <option value="">Pilih Pelanggan</option>
                                            {pelangganOptions.map((pelanggan) => (
                                                <option key={pelanggan.id_customer} value={pelanggan.id_customer}>{pelanggan.nama}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Pilih User</label>
                                        <select name="id_user" className="form-control" required>
                                            <option value="">Pilih User</option>
                                            {userOptions.map((user) => (
                                                <option key={user.id_user} value={user.id_user}>{user.nama}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Tanggal Selesai</label>
                                        <input type="date" name='tanggal_selesai' className='form-control' required />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select name="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                            <option value="pending">Pending</option>
                                            <option value="proses">Proses</option>
                                            <option value="selesai">Selesai</option>
                                            <option value="sudah diambil">Sudah Diambil</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Metode Pembayaran</label>
                                        <select name="metode_pembayaran" className="form-control" value={metodePembayaran} onChange={(e) => setMetodePembayaran(e.target.value)} required>
                                            <option value="">Pilih Metode</option>
                                            <option value="Tunai">Tunai</option>
                                            <option value="Transfer">Transfer</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Pilih Paket</label>
                                        <select name="id_paket" className="form-control" value={selectedPaket} onChange={(e) => setSelectedPaket(e.target.value)} required>
                                            <option value="">Pilih Paket</option>
                                            {paketOptions.map(p => (
                                                <option key={p.id_paket} value={p.id_paket}>{p.nama_paket} - Rp{p.harga}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Jumlah</label>
                                        <input type="number" className="form-control" value={jumlah} onChange={(e) => setJumlah(e.target.value)} min="1" required />
                                    </div>
                                </div>
                                <div className="card-footer" style={{ background: 'white' }}>
                                    <button type='submit' className='btn btn-primary btn-block'>Tambah</button>
                                    <Link to="/admin/pesanan" className='btn btn-secondary btn-block mt-3'>Lihat Pesanan</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddPesanan;