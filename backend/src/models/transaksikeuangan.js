const koneksi = require("./db")

const selectTransaksiKeuangan = (callback) => {
    const q = `
        SELECT 
            transaksikeuangan.id_transaksi, 
            pesanan.id_order, 
            paket.nama_paket, 
            transaksikeuangan.tanggal,
            transaksikeuangan.jenis, 
            transaksikeuangan.jumlah, 
            transaksikeuangan.deskripsi, 
            transaksikeuangan.total_pemasukan,
            transaksikeuangan.total_pengeluaran,
            transaksikeuangan.saldo
        FROM transaksikeuangan
        LEFT JOIN pesanan ON transaksikeuangan.id_order = pesanan.id_order
        LEFT JOIN pelanggan ON pesanan.id_customer = pelanggan.id_customer
        LEFT JOIN paket ON transaksikeuangan.id_paket = paket.id_paket
    `;
    koneksi.query(q, callback);
};

const selectTransaksiKeuanganById = (id_transaksi, callback) => {
    const q = `
        SELECT 
            transaksikeuangan.id_transaksi, 
            pesanan.id_order, 
            paket.nama_paket, 
            transaksikeuangan.tanggal,
            transaksikeuangan.jenis, 
            transaksikeuangan.jumlah, 
            transaksikeuangan.deskripsi, 
            transaksikeuangan.total_pemasukan,
            transaksikeuangan.total_pengeluaran,
            transaksikeuangan.saldo
        FROM transaksikeuangan
        LEFT JOIN pesanan ON transaksikeuangan.id_order = pesanan.id_order
        LEFT JOIN pelanggan ON pesanan.id_customer = pelanggan.id_customer
        LEFT JOIN paket ON transaksikeuangan.id_paket = paket.id_paket
        WHERE transaksikeuangan.id_transaksi = ?
    `;
    koneksi.query(q, [id_transaksi], callback);
};

const insertTransaksiKeuangan = (id_order,id_paket,jenis,jumlah,deskripsi, callback) => {
    console.log("Data yang akan dimasukkan:", { id_order, id_paket, jenis, jumlah, deskripsi });

    const q = "insert into transaksikeuangan(id_order,id_paket,jenis,jumlah,deskripsi) values(?,?,?,?,?)"
    koneksi.query(q, [id_order || null,id_paket || null,jenis,jumlah,deskripsi], callback)
}

const deleteTransaksiKeuangan = (id, callback) => {
    if (id) {
        const q = "delete from transaksikeuangan where id_transaksi=?"
        koneksi.query(q, [id], callback)
    } else {
        console.error("Ilegal akses")
    }
}



module.exports = { selectTransaksiKeuangan, insertTransaksiKeuangan, deleteTransaksiKeuangan, selectTransaksiKeuanganById, }