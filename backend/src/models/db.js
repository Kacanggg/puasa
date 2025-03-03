const mysql = require("mysql2")
const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_laundry"
})
koneksi.connect((err) => {
    if (err) {
        console.error("Gagal koneksi ke database", err.stack)
        return
    }
    console.log("berhasil koneksi ke database db_laundry")
})

module.exports = koneksi