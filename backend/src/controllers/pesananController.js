const Pesanan = require("../models/pesanan")

const index = (req, res) => {
    Pesanan.selectPesanan((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "pesanan kosong" })
        }
        res.status(200).json(result)
    })
}

const idPesanan = (req, res) => {
    const { id_order } = req.params;

    // Periksa apakah ID adalah angka yang valid
    if (isNaN(id_order)) {
        return res.status(400).json({ message: "ID harus berupa angka" });
    }

    console.log(`Mencari produk dengan ID: ${id_order}`); // Debugging

    Pesanan.selectPesananById(id_order, (err, result) => {
        if (err) {
            console.error("Database error:", err); // Debugging error
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            console.log("Produk tidak ditemukan"); // Debugging jika produk tidak ada
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        console.log("Produk ditemukan:", result); // Debugging jika produk ditemukan
        res.json(result[0]); // Kirim hasil produk dalam format JSON
    });
};

const getTrafficPesanan = (req, res) => {
    Pesanan.selectTrafficPesanan((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Data traffic pesanan tidak ditemukan" });
        }
        res.status(200).json(result);
    });
};


const storePesanan = (req, res) => {
    const { id_customer, id_user, tanggal_selesai, status, metode_pembayaran, id_paket, jumlah } = req.body;

    if (!id_customer || !id_user || !tanggal_selesai || !status || !metode_pembayaran || !id_paket || !jumlah) {
        return res.status(400).json({ error: "Semua data harus diisi" });
    }

    Pesanan.insertPesanan(id_customer, id_user, tanggal_selesai, status, metode_pembayaran, (err, id_order) => {
        if (err) {
            return res.status(500).json({ error: "Gagal menambahkan pesanan", details: err });
        }

        console.log("Pesanan berhasil ditambahkan dengan ID:", id_order); // Debugging

        // Setelah pesanan dibuat, tambahkan detail pesanan
        Pesanan.insertDetailPesanan(id_order, id_paket, jumlah, (err2, result2) => {
            if (err2) {
                return res.status(500).json({ error: "Gagal menambahkan detail pesanan", details: err2 });
            }
            res.status(201).json({ message: "Pesanan dan detail pesanan berhasil ditambahkan", id_order, detailPesanan: result2 });
        });
    });
};


const editPesanan = (req, res) => {
    const { id_customer, id_user, tanggal_selesai, status, metode_pembayaran } = req.body;
    const { id_order } = req.params;

    console.log("ID Order yang diterima:", id_order); // Logging untuk debug
    console.log("Data yang diterima:", req.body); // Logging untuk debug

    Pesanan.updatePesanan(id_order, id_customer, id_user, tanggal_selesai, status, metode_pembayaran, (err, result) => {
        if (err) {
            console.error("Error saat update pesanan:", err); 
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json("Update data berhasil");
    });
};

const destroyPesanan = (req, res) => {
    const { id_order } = req.params
    Pesanan.deletePesanan(id_order, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json("Delete data berhasil")
    })
}

module.exports = { index, storePesanan, editPesanan, destroyPesanan, idPesanan,getTrafficPesanan }