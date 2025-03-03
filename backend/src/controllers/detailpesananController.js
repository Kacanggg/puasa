const DetailPesanan = require("../models/detailpesanan")

const index = (req, res) => {
    DetailPesanan.selectDetailPesanan((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Detail Pesanan kosong" })
        }
        res.status(200).json(result)
    })
}

const idDetailPesanan = (req, res) => {
    const { id_orderdetails } = req.params;

    // Periksa apakah ID adalah angka yang valid
    if (isNaN(id_orderdetails)) {
        return res.status(400).json({ message: "ID harus berupa angka" });
    }

    console.log(`Mencari Detail Pesanan dengan ID: ${id_orderdetails}`); // Debugging

    DetailPesanan.selectDetailPesananById(id_orderdetails, (err, result) => {
        if (err) {
            console.error("Database error:", err); // Debugging error
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            console.log("Detail Pesanan tidak ditemukan"); // Debugging jika produk tidak ada
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        console.log("Detail Pesanan ditemukan:", result); // Debugging jika produk ditemukan
        res.json(result[0]); // Kirim hasil produk dalam format JSON
    });
};



const storeDetailPesanan = (req, res) => {
    const { id_order, id_paket, jumlah} = req.body

    DetailPesanan.insertDetailPesanan(id_order, id_paket, jumlah, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(201).json({ message: "Simpan berhasil", detailpesananId: result.insertId })
    })
}

const editDetailPesanan = (req, res) => {
    const { id_paket, jumlah, harga, total_harga } = req.body;
    const { id_orderdetails } = req.params;

    console.log("ID Orderdetails yang diterima:", id_orderdetails); // Logging debug

    DetailPesanan.updateDetailPesanan(id_orderdetails, id_paket, jumlah, harga, total_harga, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json("Update data berhasil");
    });
};

const destroyDetailPesanan = (req, res) => {
    const { id_orderdetails } = req.params
    DetailPesanan.deleteDetailPesanan(id_orderdetails, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json("Delete data berhasil")
    })
}

module.exports = { index, storeDetailPesanan, editDetailPesanan, destroyDetailPesanan, idDetailPesanan}