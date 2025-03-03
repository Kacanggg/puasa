import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditPelanggan = () => {
    const { id_customer } = useParams();
    const [nama ,setNamaPelanggan] = useState('');
    const [nomor, setNomor] = useState('');
    const [alamat, setAlamat] = useState('');
    
    const token = localStorage.getItem('token');


    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        name === 'nama' ? setNamaPelanggan(event.target.value) : '';
        name === 'nomor' ? setNomor(event.target.value) : '';
        name === 'alamat' ? setAlamat(event.target.value) : '';
    }

    const getUser = async () => {
        const response = await fetch('http://localhost:3000/api/pelanggan/' + id_customer, {
            headers: {
                Authorization: `bearer ${token}`,
            }
        });
        const data = await response.json();
        setNamaPelanggan(data.nama);
        setNomor(data.nomor);
        setAlamat(data.alamat);
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
        const response = await fetch("http://localhost:3000/api/pelanggan/" + id_customer, {
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
                window.location.href = '/admin/pelanggan';
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
                                        <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Edit Pelanggan</h2>
                                        <div className="form-group">
                                            <label htmlFor="nama" style={{ marginLeft: '12px' }}>Nama</label>
                                            <input type="text" value={nama} onChange={handleChange} name='nama' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nomor" style={{ marginLeft: '12px' }}>Nomor</label>
                                            <input type="text" value={nomor} onChange={handleChange} name='nomor' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="alamat" style={{ marginLeft: '12px' }}>Alamat</label>
                                            <input type="text" value={alamat} onChange={handleChange} name='alamat' className='form-control' style={{ background:"#fff",border:"1px solid #d1d9e6", borderRadius: '8px',padding:"12px",marginBottom:"12px" }} />
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

export default EditPelanggan