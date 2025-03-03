import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AddPaket = () => {
    const token = localStorage.getItem('token');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }

        const response = await fetch("http://localhost:3000/api/paket", {
            method: "POST",
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
                text: "Simpan berhasil",
                timer: 1000
            }).then(res => {
                window.location.href = '/admin/paket';
            })
        }
    }

    return (
        <>
            <section className='content' style={{ background: '#dee9ff', width: '1006px' }}>
                <div className="container" style={{ padding: '20px 0' }}>
                    <div className="row">
                        <div className="col">
                            <div className="card" style={{ background: '#fff', maxWidth: '500px', margin: 'auto', padding: '20px 40px', borderRadius: '1.5rem', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.075)' }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body registration-form">
                                        <div className="form-icon" style={{ textAlign: 'center', background: '#5891ff', borderRadius: '50%', fontSize: '40px', color: 'white', width: '100px', height: '100px', margin: 'auto', marginBottom: '20px', lineHeight: '100px' }}>
                                            <span><i className='nav-icon fas fa-user' /></span>
                                        </div>
                                        <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Data Paket</h2>
                                        <div className="form-group" >
                                            <label htmlFor="nama_paket" style={{ marginLeft: '12px' }} >Nama Paket</label>
                                            <input type="text" name='nama_paket' className='form-control item' id="nama_paket" placeholder="Nama Paket" style={{ borderRadius: '1rem' }} />
                                        </div>
                                        <div className="name">Satuan</div>
                                        <div className="value">
                                            <div className="input-group">
                                                <select
                                                    name="satuan"
                                                    className="input--style-5"
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        fontSize: '16px',
                                                        color: '#555',
                                                    }}
                                                >
                                                    <option
                                                        disabled="disabled"
                                                        selected="selected"
                                                        style={{ color: '#555' }}
                                                    >
                                                        Pilih Satuan
                                                    </option>
                                                    <option value="kg">Kg</option>
                                                    <option value="pcs">Pcs</option>
                                                    <option value="meter">Meter</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="harga" style={{ marginLeft: '12px' }}>Harga</label>
                                            <input type="text" name='harga' className='form-control item' placeholder="Harga" style={{ borderRadius: '1rem' }} />
                                        </div>
                                    </div>
                                    <div className="card-footer" style={{ background: 'white' }}>
                                        <button type='submit' className='btn btn-primary btn-block create-account' style={{ borderRadius: '1rem' }}>Tambah</button>
                                        <Link to="/admin/paket" className='btn btn-secondary btn-block mt-3' style={{ width: '100%', borderRadius: '1rem' }}>Lihat Paket</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddPaket