const koneksi = require("./db")

const selectPelanggan = (callback) => {
    const q = "select * from pelanggan"
    koneksi.query(q, callback)
}

const selectPelangganById = (nama, callback) => {
    const q = "select * from pelanggan where id_customer=?"
    koneksi.query(q, [nama], callback)
}

const insertPelanggan = (nama, nomor, alamat, callback) => {
    const q = "insert into pelanggan(nama,nomor,alamat) values(?,?,?)"
    koneksi.query(q, [nama, nomor, alamat], callback)
}

const updatePelanggan = (id_customer, nama, nomor, alamat, callback) => {
    const q = "update pelanggan set nama =?,nomor =?,alamat=? where id_customer=?"
    koneksi.query(q, [nama, nomor, alamat, id_customer], callback)
}

const deletePelanggan = (id, callback) => {
    if (id) {
        const q = "delete from pelanggan where id_customer=?"
        koneksi.query(q, [id], callback)
    } else {
        console.error("Ilegal akses")
    }
}



module.exports = { selectPelanggan, insertPelanggan, updatePelanggan, deletePelanggan, selectPelangganById }