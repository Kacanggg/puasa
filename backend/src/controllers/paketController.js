const Paket = require("../models/paket")

const index = (req, res) => {
    Paket.selectPaket((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "paket kosong" })
        }
        res.status(200).json(result)
    })
}


const storePaket = (req, res) => {
    const { nama_paket, satuan, harga } = req.body
    Paket.insertPaket(nama_paket, satuan, harga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(201).json({ message: "Simpan berhasil", PaketId: result.insertId })
    })
}

const idPaket = (req, res) => {
    const { id_paket } = req.params;

    // Periksa apakah ID adalah angka yang valid
    if (isNaN(id_paket)) {
        return res.status(400).json({ message: "ID harus berupa angka" });
    }

    console.log(`Mencari Paket dengan ID: ${id_paket}`); // Debugging

    Paket.selectPaketById(id_paket, (err, result) => {
        if (err) {
            console.error("Database error:", err); // Debugging error
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            console.log("Paket tidak ditemukan"); // Debugging jika produk tidak ada
            return res.status(404).json({ message: "Paket tidak ditemukan" });
        }

        console.log("Paket ditemukan:", result); // Debugging jika produk ditemukan
        res.json(result[0]); // Kirim hasil produk dalam format JSON
    });
};

const editPaket = (req, res) => {
    const { nama_paket, satuan, harga } = req.body;
    const { id_paket } = req.params;

    console.log("ID Paket yang diterima:", id_paket); // Logging untuk debug

    Paket.updatePaket(id_paket, nama_paket, satuan, harga, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json("Update data berhasil");
    });
};

const destroyPaket = (req, res) => {
    const { id_paket } = req.params
    Paket.deletePaket(id_paket, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json("Delete data berhasil")
    })
}

module.exports = { index, storePaket, editPaket, destroyPaket,idPaket, }