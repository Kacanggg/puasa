const Pelanggan = require("../models/pelanggan")

const index = (req, res) => {
    Pelanggan.selectPelanggan((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "pelanggan kosong" })
        }
        res.status(200).json(result)
    })
}

const idPelanggan = (req, res) => {
    const { id_customer } = req.params;

    // Periksa apakah ID adalah angka yang valid
    if (isNaN(id_customer)) {
        return res.status(400).json({ message: "ID harus berupa angka" });
    }

    console.log(`Mencari Pelanggan dengan ID: ${id_customer}`); // Debugging

    Pelanggan.selectPelangganById(id_customer, (err, result) => {
        if (err) {
            console.error("Database error:", err); // Debugging error
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            console.log("Pelanggan tidak ditemukan"); // Debugging jika produk tidak ada
            return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
        }

        console.log("Pelanggan ditemukan:", result); // Debugging jika produk ditemukan
        res.json(result[0]); // Kirim hasil produk dalam format JSON
    });
};


const storePelanggan = (req, res) => {
    const { nama, nomor, alamat } = req.body
    Pelanggan.insertPelanggan(nama, nomor, alamat, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(201).json({ message: "Simpan berhasil", PelangganId: result.insertId })
    })
}

const editPelanggan = (req, res) => {
    const { nama, nomor, alamat } = req.body
    const { id_customer } = req.params
    Pelanggan.updatePelanggan(id_customer, nama, nomor, alamat, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json("Update data berhasil")
    })
}

const destroyPelanggan = (req, res) => {
    const { id_customer } = req.params
    Pelanggan.deletePelanggan(id_customer, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json("Delete data berhasil")
    })
}

module.exports = { index, storePelanggan, editPelanggan, destroyPelanggan, idPelanggan,}