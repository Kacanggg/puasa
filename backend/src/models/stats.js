const koneksi = require("./db");

const getStats = (callback) =>{
    const q = "SELECT (SELECT COUNT(*) FROM pelanggan) AS pelanggan,(SELECT COUNT(*) FROM pesanan) AS pesanan,(SELECT COUNT(*) FROM paket) AS paket,(SELECT CAST(saldo AS UNSIGNED) FROM transaksikeuangan ORDER BY tanggal DESC, id_transaksi DESC LIMIT 1) AS saldo"
    koneksi.query(q, callback)
}

module.exports = { getStats };
