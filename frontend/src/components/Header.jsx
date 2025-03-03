import React from 'react'

const Header = () => {
    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-cyan navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/admin/dashboard" className="nav-link">Home</a>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt" />
                        </a>
                    </li>
                </ul>
            </nav>
            {/* /.navbar */}
        </>
    )
}

export default Header