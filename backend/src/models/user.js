const koneksi = require("./db")
const bcrypt = require("bcryptjs")

const selectUsers = (callback) => {
    const q = "select * from user"
    koneksi.query(q, callback)
}

const selectUsersByName = (nama, callback) => {
    const q = "select * from user where nama=?"
    koneksi.query(q, [nama], callback)  
}

const selectUsersByRole = (role, callback) => {
    const q = "select * from user where role=?"
    koneksi.query(q, [role], callback)
}

const selectUsersById = (nama, callback) => {
    const q = "select * from user where id_user=?"
    koneksi.query(q, [nama], callback)
}

const insertUsers = (nama, password, role, callback) => {
    if (password) {
        const hashedPass = bcrypt.hashSync(password, 10)
        const q = "insert into user(nama,password,role) values(?,?,?)"
        koneksi.query(q, [nama, hashedPass, role], callback)
    } else {
        console.error("Password harus diisi")
    }
}

const updateUsers = (id_user, nama, password,role, callback) => {
    if (password) {
        const hashedPass = bcrypt.hashSync(password, 10)
        const q = "update user set nama =?,password=?,role=? where id_user=?"
        koneksi.query(q, [nama, hashedPass,role, id_user], callback)
    } else {
        const q = "update user set nama =?,role=? where id_user=?"
        koneksi.query(q, [nama,role, id_user], callback)
    }
}

const deleteUsers = (id, callback) => {
    if (id) {
        const q = "delete from user where id_user=?"
        koneksi.query(q, [id], callback)
    } else {
        console.error("Ilegal akses")
    }
}



module.exports = { selectUsers, insertUsers, updateUsers, deleteUsers,selectUsersByName,selectUsersById,selectUsersByRole }