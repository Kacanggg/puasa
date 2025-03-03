import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Login = () => {
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = { nama, password };
    console.log(fData)

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fData),
      });

      const data = await response.json();
      console.log(data)

      if (data.token && data.role) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role); // Simpan role di localStorage
        event.target.reset();

        // Redirect sesuai role
        if (data.role === "admin") {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/karyawan/dashboardkaryawan';
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "User Tidak Ditemukan",
          timer: 1000
        });
      }
    } catch (error) {
      console.error('Error : ', error);
      Swal.fire({
        icon: "error",
        text: "Terjadi kesalahan saat login, coba lagi",
        timer: 1000
      });
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>

        <div className="login-box">
          <div className="login-logo">
            <a href="#"><b>Laundry</b></a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="nama"
                    name="nama"
                    className="form-control"
                    placeholder="Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                      <span className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* /.col */}
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;