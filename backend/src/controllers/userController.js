const bcrypt = require("bcryptjs")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const index = (req, res) => {
    User.selectUsers((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "user kosong" })
        }
        res.status(200).json(result)
    })
}

const id = (req, res) => {
    const { id_user } = req.params;

    // Periksa apakah ID adalah angka yang valid
    if (isNaN(id_user)) {
        return res.status(400).json({ message: "ID harus berupa angka" });
    }

    console.log(`Mencari produk dengan ID: ${id_user}`); // Debugging

    User.selectUsersById(id_user, (err, result) => {
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

const Login = (req, res) => {
    const { nama, password } = req.body
    User.selectUsersByName(nama, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "nama dan password salah" })
        }
        const user = result[0]
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {
            return res.status(401).json({ message: "password salah" })
        }
        const token = jwt.sign({ id_user: user.id_user,role: user.role }, "kunci", { expiresIn: 86400 })
        res.status(200).json({ auth: true, token, role: user.role })
    })
}

const storeUser = (req, res) => {
    const { nama, password, role } = req.body
    User.insertUsers(nama, password, role, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(201).json({ message: "Simpan berhasil", userId: result.insertId })
    })
}

const editUser = (req, res) => {
    const { nama, password,role } = req.body
    const { id_user } = req.params
    User.updateUsers(id_user, nama,password,role, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json("Update data berhasil")
    })
}
const destroyUser = (req, res) => {
    const { id_user } = req.params
    User.deleteUsers(id_user, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json("Delete data berhasil")
    })
}

module.exports = { index, storeUser, editUser, destroyUser, Login, id, }