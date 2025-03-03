import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditPaket = () => {
    const { id_paket } = useParams();
    const [nama_paket ,setNamaPaket] = useState('');
    const [satuan, setSatuan] = useState('');
    const [harga, setHarga] = useState('');
    
    const token = localStorage.getItem('token');


    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        name === 'nama_paket' ? setNamaPaket(event.target.value) : '';
        name === 'satuan' ? setSatuan(event.target.value) : '';
        name === 'harga' ? setHarga(event.target.value) : '';
    }

    const getUser = async () => {
        const response = await fetch('http://localhost:3000/api/paket/' + id_paket, {
            headers: {
                Authorization: `bearer ${token}`,
            }
        });
        const data = await response.json();
        setNamaPaket(data.nama_paket);
        setSatuan(data.satuan);
        setHarga(data.harga);
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
        const response = await fetch("http://localhost:3000/api/paket/" + id_paket, {
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
                window.location.href = '/admin/paket';
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
                                        <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Edit Paket</h2>
                                        <div className="form-group">
                                            <label htmlFor="nama_paket" style={{ marginLeft: '12px' }}>Nama Paket</label>
                                            <input type="text" value={nama_paket} onChange={handleChange} name='nama_paket' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="satuan" style={{ marginLeft: '12px' }}>Satuan</label>
                                            <input type="text" value={satuan} onChange={handleChange} name='satuan' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="harga" style={{ marginLeft: '12px' }}>Harga</label>
                                            <input type="text" value={harga} onChange={handleChange} name='harga' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
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

export default EditPaket