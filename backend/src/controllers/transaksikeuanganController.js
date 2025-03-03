const TransaksiKeuangan = require("../models/transaksikeuangan")

const index = (req, res) => {
    TransaksiKeuangan.selectTransaksiKeuangan((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Transaksi Keuangan kosong" })
        }
        res.status(200).json(result)
    })
}


const storeTransaksiKeuangan = (req, res) => {
    const { id_order,id_paket,jenis,jumlah,deskripsi } = req.body
    TransaksiKeuangan.insertTransaksiKeuangan(id_order,id_paket,jenis,jumlah,deskripsi, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        // console.log("id Paket =", id_paket);
        res.status(201).json({ message: "Simpan berhasil", TransaksiKeuanganId: result.insertId })
    })
}

const idTransaksiKeuangan = (req, res) => {
    const { id_transaksi } = req.params;

    // Periksa apakah ID adalah angka yang valid
    if (isNaN(id_transaksi)) {
        return res.status(400).json({ message: "ID harus berupa angka" });
    }

    console.log(`Mencari Paket dengan ID: ${id_transaksi}`); // Debugging

    TransaksiKeuangan.selectTransaksiKeuanganById(id_transaksi, (err, result) => {
        if (err) {
            console.error("Database error:", err); // Debugging error
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            console.log("Transaksi Keuangan tidak ditemukan"); // Debugging jika produk tidak ada
            return res.status(404).json({ message: "Transaksi Keuangan tidak ditemukan" });
        }

        console.log("Transaksi Keuangan ditemukan:", result); // Debugging jika produk ditemukan
        res.json(result[0]); // Kirim hasil produk dalam format JSON
    });
};


const destroyTransaksiKeuangan = (req, res) => {
    const { id_transaksi } = req.params
    TransaksiKeuangan.deleteTransaksiKeuangan(id_transaksi, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json("Delete data berhasil")
    })
}

module.exports = { index, storeTransaksiKeuangan, destroyTransaksiKeuangan,idTransaksiKeuangan, }