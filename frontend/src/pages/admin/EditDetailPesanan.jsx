import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditDetailPesanan = () => {
    const { id_orderdetails } = useParams();
    const [id_order ,setIdOrder] = useState('');
    const [id_paket , setIdPaket] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [harga, setHarga] = useState('');
    const [total_harga, setTotalHarga] = useState('');
    
    const token = localStorage.getItem('token');


    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        name === 'id_order' ? setIdOrder(event.target.value) : '';
        name === 'id_paket' ? setIdPaket(event.target.value) : '';
        name === 'jumlah' ? setJumlah(event.target.value) : '';
        name === 'harga' ? setHarga(event.target.value) : '';
        name === 'total_harga' ? setTotalHarga(event.target.value) : '';
    }

    const getUser = async () => {
        const response = await fetch('http://localhost:3000/api/detailpesanan/' + id_orderdetails, {
            headers: {
                Authorization: `bearer ${token}`,
            }
        });
        const data = await response.json();
        setIdOrder(data.id_order);
        setIdPaket(data.id_paket);
        setJumlah(data.jumlah);
        setHarga(data.harga);
        setTotalHarga(data.total_harga);
    }

    

    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let elm of frmel.elements) {
            if (elm.name && elm.value.trim()) {
                fData[elm.name] = elm.value;
            }
        }
        const response = await fetch("http://localhost:3000/api/detailpesanan/" + id_orderdetails, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });
        if (!response.ok) {
            console.log(error => console.error);
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "update berhasil",
                timer: 1000
            }).then(res => {
                window.location.href = '/admin/detailpesanan';
            })
        }
    }

    return (
        <>
            <section className='content' style={{ background: '#fff', width: '100%',padding: '20px' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="card" style={{ background: '#fff', maxWidth: '500px', margin: 'auto', padding: '20px 40px', borderRadius: '1.5rem', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.075)' }}>
                                <form onSubmit={handleUpdate}>
                                    <div className="card-body">
                                        <div className="form-icon" style={{ textAlign: 'center', background: '#5891ff', borderRadius: '50%', fontSize: '40px', color: 'white', width: '100px', height: '100px', margin: 'auto', marginBottom: '20px', lineHeight: '100px' }}>
                                            <span><i className="icon icon-user" /></span>
                                        </div>
                                        <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Edit Detail Pesanan</h2>
                                        <div className="form-group">
                                            <label htmlFor="id_order" style={{ marginLeft: '12px' }}>ID Order</label>
                                            <input type="text" value={id_order} onChange={handleChange} name='id_order' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="id_paket" style={{ marginLeft: '12px' }}>ID Paket</label>
                                            <input type="text" value={id_paket} onChange={handleChange} name='id_paket' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="jumlah" style={{ marginLeft: '12px' }}>Jumlah</label>
                                            <input type="text" value={jumlah} onChange={handleChange} name='jumlah' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="harga" style={{ marginLeft: '12px' }}>Harga</label>
                                            <input type="text" value={harga} onChange={handleChange} name='harga' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="total_harga" style={{ marginLeft: '12px' }}>Total Harga</label>
                                            <input type="text" value={total_harga} onChange={handleChange} name='total_harga' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                    </div>
                                    <div className="card-footer" style={{ background: 'white', marginTop: '-20px' }}>
                                        <button type='submit' className='btn btn-primary' style={{ borderRadius: '1rem', width: '100%', padding: '7px', fontSize: '1rem' }}> Simpan </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default EditDetailPesanan