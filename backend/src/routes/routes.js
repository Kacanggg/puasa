const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const pelangganController = require("../controllers/pelangganController")
const paketController = require("../controllers/paketController")
const pesananController = require("../controllers/pesananController")
const detailpesananController = require("../controllers/detailpesananController")
const transaksikeuanganController = require("../controllers/transaksikeuanganController")
const authJWT = require("../middlewares/authMiddleware")
const statsController = require("../controllers/statsController")

router.get("/users",authJWT(['admin']), userController.index)
router.get("/users/:id_user",authJWT(['admin']), userController.id)
router.post("/users",authJWT(['admin']), userController.storeUser)
router.put("/users/:id_user",authJWT(['admin']), userController.editUser)
router.delete("/users/:id_user",authJWT(['admin']), userController.destroyUser)

router.get("/pelanggan",authJWT(['karyawan','admin']), pelangganController.index)
router.get("/pelanggan/:id_customer",authJWT(['karyawan','admin']), pelangganController.idPelanggan)
router.post("/pelanggan",authJWT(['karyawan','admin']), pelangganController.storePelanggan)
router.put("/pelanggan/:id_customer",authJWT(['karyawan','admin']), pelangganController.editPelanggan)
router.delete("/pelanggan/:id_customer",authJWT(['karyawan','admin']), pelangganController.destroyPelanggan)

router.get("/paket",authJWT(['karyawan','admin']), paketController.index)
router.get("/paket/:id_paket",authJWT(['karyawan','admin']), paketController.idPaket)
router.post("/paket",authJWT(['karyawan','admin']), paketController.storePaket)
router.put("/paket/:id_paket",authJWT(['karyawan','admin']), paketController.editPaket)
router.delete("/paket/:id_paket",authJWT(['karyawan','admin']), paketController.destroyPaket)

router.get("/pesanan",authJWT(['karyawan','admin']), pesananController.index)
router.get("/pesanan/traffic",authJWT(['karyawan','admin']), pesananController.getTrafficPesanan);
router.get("/pesanan/:id_order",authJWT(['karyawan','admin']), pesananController.idPesanan)
router.post("/pesanan",authJWT(['karyawan','admin']), pesananController.storePesanan)
router.put("/pesanan/:id_order",authJWT(['karyawan','admin']), pesananController.editPesanan)
router.delete("/pesanan/:id_order",authJWT(['karyawan','admin']), pesananController.destroyPesanan)

router.get("/detailpesanan",authJWT(['karyawan','admin']), detailpesananController.index)
router.get("/detailpesanan/:id_orderdetails",authJWT(['karyawan','admin']), detailpesananController.idDetailPesanan)
router.post("/detailpesanan",authJWT(['karyawan','admin']), detailpesananController.storeDetailPesanan)
router.put("/detailpesanan/:id_orderdetails",authJWT(['karyawan','admin']), detailpesananController.editDetailPesanan)
router.delete("/detailpesanan/:id_orderdetails",authJWT(['karyawan','admin']), detailpesananController.destroyDetailPesanan)

router.get("/transaksi",authJWT(['karyawan','admin']), transaksikeuanganController.index)
router.get("/transaksi/:id_transaksi",authJWT(['karyawan','admin']), transaksikeuanganController.idTransaksiKeuangan)
router.post("/transaksi",authJWT(['karyawan','admin']), transaksikeuanganController.storeTransaksiKeuangan)
router.delete("/transaksi/:id_transaksi",authJWT(['karyawan','admin']), transaksikeuanganController.destroyTransaksiKeuangan)

router.post("/login", userController.Login)

router.get("/stats",statsController.index)

module.exports = router