import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const User = () => {
    const [dataUser, setUser] = useState([]);
    const token = localStorage.getItem('token');

    const tampilData = async () => {
        const response = await fetch('http://localhost:3000/api/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        tampilData();
    }, []);

    const handleDelete = (id_user) => {
        Swal.fire({
            icon: "warning",
            title: "yakin menghapus data?",
            showCancelButton: true,
            confirmButtonText: "yakin",
            cancelButtonText: "batal"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/api/users/' + id_user, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then(response => response.json())
                    .then(res => {
                        window.location.reload();
                    });
            }
        });
    }
    return (
            <div style={{ backgroundColor: '#dee9ff', minHeight: '100vh' }}>
                <div className="content-header" style={{ padding: '10px 0' }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <h1 className='text-center' style={{ paddingTop: '10px' }}>Data User</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='content' style={{ padding: '10px 20px' }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <table className='table table-striped mt-2' style={{ borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0px 2px 10px rgba(0, 0.3, 0, 0.3)' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#15A3C7', color: 'white' }}>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Role</th>
                                            <th>Edit</th>
                                            <th>Hapus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataUser.length > 0 ? (
                                            dataUser.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nama}</td>
                                                    <td>{item.role}</td>
                                                    <td>
                                                        <Link to={`/admin/edituser/${item.id_user}`} className='btn btn-warning' style={{borderRadius:'0.5rem'}}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleDelete(item.id_user)} className='btn btn-danger' style={{borderRadius:'0.5rem'}}>Hapus</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" style={{ textAlign: 'center' }}>Data Kosong</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <Link to="/admin/adduser" className='btn btn-custom mt-3' style={{background:'#15A3C7',color:'white', borderRadius:'0.5rem'}}>Tambah User</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    );
}

export default User;
