const mysql = require('mysql2')
const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
})

const CreateUserTable = (koneksi) => {
    const q = `create table if not exists user (id_user int primary key auto_increment, nama varchar(100), password varchar(100), role ENUM('admin', 'karyawan'), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, deleted_at TIMESTAMP NULL DEFAULT NULL )`

    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat tabel users", err.stack)
            return
        }
        console.log("tabel users berhasil dibuat")
    })
}

const CreatePelangganTable = (koneksi) => {
    const q = 'create table if not exists pelanggan (id_customer int primary key auto_increment, nama varchar(100), nomor varchar(15), alamat text,created_at DATETIME default CURRENT_TIMESTAMP, deleted_at TIMESTAMP NULL DEFAULT NULL)'

    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat tabel pelanggan", err.stack)
            return
        }
        console.log("tabel pelanggan berhasil dibuat")
    })
}

const CreatePaketTable = (koneksi) => {
    const q = `create table if not exists paket (id_paket int primary key auto_increment, nama_paket varchar(100) NOT NULL, satuan ENUM('kg', 'pcs', 'meter') NOT NULL, harga decimal(10,2) NOT NULL, created_at DATETIME default CURRENT_TIMESTAMP,deleted_at TIMESTAMP NULL DEFAULT NULL)`

    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat tabel paket", err.stack)
            return
        }
        console.log("tabel paket berhasil dibuat")
    })
}

const CreatePesananTable = (koneksi) => {
    const q = `create table if not exists pesanan (id_order int primary key auto_increment, id_customer INT NOT NULL, tanggal_masuk TIMESTAMP DEFAULT CURRENT_TIMESTAMP, tanggal_selesai varchar(50) NOT NULL, status ENUM('pending','proses','selesai','sudah diambil') NOT NULL, metode_pembayaran ENUM('Tunai','Transfer') NOT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, deleted_at TIMESTAMP NULL DEFAULT NULL, id_user INT, FOREIGN KEY (id_customer) REFERENCES pelanggan(id_customer), FOREIGN KEY (id_user) REFERENCES user(id_user)  )`

    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat tabel pesanan", err.stack)
            return
        }
        console.log("tabel pesanan berhasil dibuat")
    })
}

const CreateDetailPesananTable = (koneksi) => {
    const q = `create table if not exists detailpesanan (id_orderdetails int primary key auto_increment, id_order INT NOT NULL, id_paket INT, jumlah decimal(10,2) NOT NULL, harga decimal(10,2) NOT NULL, total_harga decimal(10,2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, deleted_at TIMESTAMP NULL DEFAULT NULL, FOREIGN KEY (id_order) REFERENCES pesanan(id_order),FOREIGN KEY (id_paket) REFERENCES paket(id_paket) )`

    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat tabel detail pesanan", err.stack)
            return
        }
        console.log("tabel detail pesanan berhasil dibuat")
    })
}

const CreateKeuanganTable = (koneksi) => {
    const q = `create table if not exists transaksikeuangan (id_transaksi int primary key auto_increment,id_order INT, id_paket INT, tanggal DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, jenis ENUM('pemasukan','pengeluaran') NOT NULL, jumlah decimal(10,2) NOT NULL, deskripsi varchar(100) NOT NULL, total_pemasukan decimal(10,2), total_pengeluaran decimal(10,2), saldo decimal(10,2) NOT NULL,deleted_at DATETIME NULL DEFAULT NULL, FOREIGN KEY (id_order) REFERENCES pesanan(id_order),FOREIGN KEY (id_paket) REFERENCES paket(id_paket))`

    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat tabel keuangan", err.stack)
            return
        }
        console.log("tabel keuangan berhasil dibuat")
    })
}

const CreateTriggerBeforeInsert = (koneksi) => {
    const q = `
        CREATE TRIGGER before_insert_transaksi
        BEFORE INSERT ON transaksikeuangan
        FOR EACH ROW
        BEGIN
            DECLARE last_saldo DECIMAL(10,2);
            DECLARE transaksi_count INT;

            -- Cek apakah id_order sudah ada di transaksikeuangan
            SELECT COUNT(*) INTO transaksi_count FROM transaksikeuangan WHERE id_order = NEW.id_order;
            
            -- Jika sudah ada, batalkan INSERT agar tidak terjadi duplikasi
            IF transaksi_count > 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Duplikasi transaksi, id_order sudah ada!';
            END IF;

            -- Ambil saldo terakhir
            SELECT saldo INTO last_saldo FROM transaksikeuangan 
            ORDER BY id_transaksi DESC LIMIT 1;

            -- Jika tidak ada saldo sebelumnya, set default 0
            IF last_saldo IS NULL THEN
                SET last_saldo = 0;
            END IF;

            -- Hitung saldo baru berdasarkan jenis transaksi
            IF NEW.jenis = 'pemasukan' THEN
                SET NEW.saldo = last_saldo + NEW.jumlah;
                SET NEW.total_pemasukan = NEW.jumlah;
                SET NEW.total_pengeluaran = 0;
            ELSEIF NEW.jenis = 'pengeluaran' THEN
                SET NEW.saldo = last_saldo - NEW.jumlah;
                SET NEW.total_pemasukan = 0;
                SET NEW.total_pengeluaran = NEW.jumlah;
            END IF;
        END;
    `;

    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("Error membuat trigger before_insert_transaksi:", err.stack);
            return;
        }
        console.log("Trigger before_insert_transaksi berhasil dibuat");
    });
};

// const CreateTriggerAfterDelete = (koneksi) => {
//     const q = `
//         CREATE TRIGGER after_delete_transaksi
// AFTER DELETE ON transaksikeuangan
// FOR EACH ROW
// BEGIN
//     -- Update saldo setelah transaksi dihapus
//     UPDATE transaksikeuangan 
//     SET saldo = saldo - OLD.jumlah 
//     WHERE id_transaksi > OLD.id_transaksi;
// END;
//     `;

//     koneksi.query(q, (err, result) => {
//         if (err) {
//             console.error("Error membuat trigger After_delete_transaksi:", err.message);
//             return;
//         }
//         console.log("Trigger After_delete_transaksi berhasil dibuat");
//     });
// };


const migration = () => {
    koneksi.connect((err) => {
        if (err) {
            console.error("gagal koneksi database", err.stack)
            return
        }
        console.log("Koneksi database berhasil")
        koneksi.query("create database if not exists db_laundry", (err, result) => {
            if (err) {
                console.error("gagal membuat database", err.stack)
                return
            }
            console.log("database berhasil dibuat atau sudah ada")
            const db = require("../models/db")
            CreateUserTable(db)
            CreatePelangganTable(db)
            CreatePaketTable(db)
            CreatePesananTable(db)
            CreateDetailPesananTable(db)
            CreateKeuanganTable(db)
            // CreateTriggerBeforeInsert(db)
            // CreateTriggerAfterDelete(db)
            koneksi.end()
        })
    })
}

module.exports = migration