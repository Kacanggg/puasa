import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({
        pelanggan: 0,
        pesanan: 0,
        paket: 0,
        saldo: 0
    });

    const [chartData, setChartData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            fetchStats();
            fetchChartData();
        }
    }, [token]);

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/stats', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Gagal mengambil data statistik');

            const data = await response.json();
            setStats({
                pelanggan: data[0]?.pelanggan || 0,
                pesanan: data[0]?.pesanan || 0,
                paket: data[0]?.paket || 0,
                saldo: data[0]?.saldo || 0,
            });
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    const fetchChartData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/transaksi', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Gagal mengambil data keuangan');

            const data = await response.json();
            const formattedData = data.map(item => ({
                hari: item.tanggal ? new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date(item.tanggal)) : "Unknown",
                pemasukan: Number(item.total_pemasukan) || 0,
                pengeluaran: Number(item.total_pengeluaran) || 0,
            }));

            setChartData(formattedData);
        } catch (error) {
            console.error("Error fetching financial data:", error);
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Laundry</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistik */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <StatBox title="Total Pelanggan" value={stats.pelanggan} icon="ion ion-ios-people" link="/admin/pelanggan" />
                        <StatBox title="Total Pesanan" value={stats.pesanan} icon="ion ion-ios-compose" link="/admin/pesanan" />
                        <StatBox title="Total Paket" value={stats.paket} icon="ion ion-ios-list" link="/admin/paket" />
                        <StatBox title="Total Saldo" value={stats.saldo} icon="ion ion-social-usd" link="/admin/transaksikeuangan" />
                    </div>
                    <div className="row">
                        {/* Grafik Pemasukan */}
                        <div className="col-md-6">
                            <div className="card-header">
                                <h3 className="card-title">Grafik Pemasukan</h3>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                                    <defs>
                                        <linearGradient id="colorPemasukan" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#15A3C7" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#15A3C7" stopOpacity={0.9} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="hari" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="pemasukan" stroke="#15A3C7" fill="url(#colorPemasukan)" strokeWidth={2} fillOpacity={0.3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Grafik Pengeluaran */}
                        <div className="col-md-6">
                            <div className="card-header">
                                <h3 className="card-title">Grafik Pengeluaran</h3>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                                    <defs>
                                        <linearGradient id="colorPengeluaran" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#15A3C7" stopOpacity={0.9} />
                                            <stop offset="95%" stopColor="#15A3C7" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="hari" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="pengeluaran" stroke="#15A3C7" fill="url(#colorPengeluaran)" strokeWidth={2} fillOpacity={0.3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>


                </div>
            </section>
        </>
    );
};

const StatBox = ({ title, value, icon, link }) => (
    <div className="col-lg-3 col-6">
        <div className="small-box bg-info">
            <div className="inner">
                <h3>{value}</h3>
                <p>{title}</p>
            </div>
            <div className="icon">
                <i className={icon} />
            </div>
            <a href={link} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
        </div>
    </div>
);

export default Dashboard;