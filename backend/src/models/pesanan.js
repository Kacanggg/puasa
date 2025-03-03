const koneksi = require("./db")

const selectPesanan = (callback) => {
    const q = `
        SELECT pesanan.id_order, pelanggan.nama AS nama, user.nama AS user, 
               pesanan.tanggal_masuk, pesanan.tanggal_selesai, pesanan.status, pesanan.metode_pembayaran 
        FROM pesanan 
        JOIN pelanggan ON pesanan.id_customer = pelanggan.id_customer
        LEFT JOIN user ON pesanan.id_user = user.id_user
    `;
    koneksi.query(q, callback);
};

const selectPesananById = (id_order, callback) => {
    const q = `
        SELECT pesanan.id_order, pelanggan.nama AS nama, user.nama AS nama_user, 
               pesanan.tanggal_masuk, pesanan.tanggal_selesai, pesanan.status, pesanan.metode_pembayaran 
        FROM pesanan 
        JOIN pelanggan ON pesanan.id_customer = pelanggan.id_customer
        LEFT JOIN user ON pesanan.id_user = user.id_user
        WHERE pesanan.id_order = ?
    `;
    koneksi.query(q, [id_order], callback);
};

const selectTrafficPesanan = (callback) => {
    const q = `
       SELECT 
    DAYNAME(tanggal) AS hari, 
    SUM(CASE WHEN jenis = 'pemasukan' THEN jumlah ELSE 0 END) AS total_pemasukan,
    SUM(CASE WHEN jenis = 'pengeluaran' THEN jumlah ELSE 0 END) AS total_pengeluaran
FROM transaksikeuangan
WHERE tanggal BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
GROUP BY hari
ORDER BY FIELD(hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu');
    `;
    koneksi.query(q, callback);
};


const insertPesanan = (id_customer, id_user, tanggal_selesai, status, metode_pembayaran, callback) => {
    const q = "INSERT INTO pesanan (id_customer, id_user, tanggal_selesai, status, metode_pembayaran) VALUES (?, ?, ?, ?, ?)";

    koneksi.query(q, [id_customer, id_user, tanggal_selesai, status, metode_pembayaran], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result.insertId); // ✅ Kembalikan ID pesanan yang baru dibuat
    });
};


const insertDetailPesanan = (id_order, id_paket, jumlah, callback) => {
    if (!id_order || !id_paket || !jumlah) {
        return callback(new Error("Data tidak boleh null"), null);
    }

    const q = `
        INSERT INTO detailpesanan (id_order, id_paket, jumlah, harga, total_harga) 
        VALUES (?, ?, ?, 
            (SELECT harga FROM paket WHERE id_paket = ?), 
            (SELECT harga FROM paket WHERE id_paket = ?) * ?
        )`;

    koneksi.query(q, [id_order, id_paket, jumlah, id_paket, id_paket, jumlah], callback);
};



const updatePesanan = (id_order, id_customer, id_user, tanggal_selesai, status, metode_pembayaran, callback) => {
    const q = "UPDATE pesanan SET id_customer =?,id_user =?, tanggal_selesai =?, status =?, metode_pembayaran =? WHERE id_order = ?";
    koneksi.query(q, [id_customer, id_user, tanggal_selesai, status, metode_pembayaran, id_order], callback);
};


const deletePesanan = (id, callback) => {
    if (id) {
        const q = "delete from pesanan where id_order=?"
        koneksi.query(q, [id], callback)
    } else {
        console.error("Ilegal akses")
    }
}



module.exports = { selectPesanan, insertPesanan, updatePesanan, deletePesanan, selectPesananById, insertDetailPesanan,selectTrafficPesanan }