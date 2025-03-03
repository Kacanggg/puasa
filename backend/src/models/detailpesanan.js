const koneksi = require("./db")

const selectDetailPesanan = (callback) => {
    const q = `
        SELECT 
            detailpesanan.id_orderdetails, 
            detailpesanan.id_order, 
            paket.nama_paket, 
            detailpesanan.jumlah, 
            paket.harga, 
            (detailpesanan.jumlah * paket.harga) AS total_harga
        FROM detailpesanan
        JOIN paket ON detailpesanan.id_paket = paket.id_paket
    `;
    koneksi.query(q, callback);
};

const selectDetailPesananById = (id_orderdetails, callback) => {
    const q = `
        SELECT 
            detailpesanan.id_orderdetails, 
            detailpesanan.id_order, 
            paket.nama_paket, 
            detailpesanan.jumlah, 
            paket.harga, 
            (detailpesanan.jumlah * paket.harga) AS total_harga
        FROM detailpesanan
        JOIN paket ON detailpesanan.id_paket = paket.id_paket
        WHERE detailpesanan.id_orderdetails = ?
    `;
    koneksi.query(q, [id_orderdetails], callback);
};

const insertDetailPesanan = (id_order, id_paket, jumlah, callback) => {
    const harga = 'select harga from paket where id_paket =?'

    koneksi.query(harga, [id_paket], (err,result) =>{
        const harga = result[0].harga
        const total_harga = (jumlah * harga)

        const q = "insert into detailpesanan(id_order,id_paket,jumlah,harga,total_harga) values(?,?,?,?,?)"
        koneksi.query(q, [id_order, id_paket, jumlah, harga, total_harga], callback)
    })

}

const updateDetailPesanan = (id_orderdetails, id_paket, jumlah, harga, total_harga, callback) => {
    const q = "UPDATE detailpesanan SET id_paket =?,jumlah =?,harga =?, total_harga =? WHERE id_orderdetails = ?";
    koneksi.query(q, [id_paket, jumlah, harga, total_harga, id_orderdetails], callback);
};


const deleteDetailPesanan = (id, callback) => {
    if (id) {
        const q = "delete from detailpesanan where id_orderdetails=?"
        koneksi.query(q, [id], callback)
    } else {
        console.error("Ilegal akses")
    }
}



module.exports = { selectDetailPesanan, insertDetailPesanan, updateDetailPesanan, deleteDetailPesanan,selectDetailPesananById }