const koneksi = require("./db")

const selectPaket = (callback) => {
    const q = "select * from paket"
    koneksi.query(q, callback)
}

const selectPaketById = (nama, callback) => {
    const q = "select * from paket where id_paket=?"
    koneksi.query(q, [nama], callback)
}

const insertPaket = (nama_paket, satuan, harga, callback) => {
    const q = "insert into paket(nama_paket, satuan, harga) values(?,?,?)"
    koneksi.query(q, [nama_paket, satuan, harga], callback)
}

const updatePaket = (id_paket, nama_paket, satuan, harga, callback) => {
    const q = "UPDATE paket SET nama_paket = ?, satuan = ?, harga = ? WHERE id_paket = ?";
    koneksi.query(q, [nama_paket, satuan, harga, id_paket], callback);
};


const deletePaket = (id, callback) => {
    if (id) {
        const q = "delete from paket where id_paket=?"
        koneksi.query(q, [id], callback)
    } else {
        console.error("Ilegal akses")
    }
}



module.exports = { selectPaket, insertPaket, updatePaket, deletePaket, selectPaketById, }