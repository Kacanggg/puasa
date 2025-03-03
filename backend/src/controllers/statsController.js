const stats = require("../models/stats")

const index = (req, res) => {
    stats.getStats((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Tabel stats Kosong" })
        }
        res.status(200).json(result)
    })
}

module.exports = {index}