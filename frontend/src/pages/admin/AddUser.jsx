import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AddUser = () => {
    const token = localStorage.getItem('token');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://localhost:3000/api/users", {
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
                window.location.href = '/admin/user';
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
                                        <h2 className='text-center' style={{ color: 'black', paddingBottom: '20px' }}>Data User</h2>
                                        <div className="form-group" >
                                            <label htmlFor="nama" style={{ marginLeft: '12px' }} >Nama</label>
                                            <input type="text" name='nama' className='form-control item' id="username" placeholder="Username" style={{ borderRadius: '1rem' }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" style={{ marginLeft: '12px' }}>Password</label>
                                            <input type="password" name='password' className='form-control item' placeholder="Password" style={{ borderRadius: '1rem' }} />
                                        </div>
                                        <div className="name">Role</div>
                                        <div className="value">
                                            <div className="input-group">
                                                <select
                                                    name="role"
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
                                                        Pilih Role
                                                    </option>
                                                    <option value="admin">Admin</option>
                                                    <option value="karyawan">Karyawan</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer" style={{ background: 'white' }}>
                                        <button type='submit' className='btn btn-primary btn-block create-account' style={{ borderRadius: '1rem' }}>Tambah</button>
                                        <Link to="/admin/user" className='btn btn-secondary btn-block mt-3' style={{ width: '100%', borderRadius: '1rem' }}>Lihat User</Link>
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

export default AddUser