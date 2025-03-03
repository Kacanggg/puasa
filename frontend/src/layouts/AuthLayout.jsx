// import React from 'react'

import { Suspense, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Prelaod from "../components/Preload"

const Authlayout = () => {
    useEffect(() => {
        document.body.classList.add("login-page")

        return () => {
            document.body.classList.remove("login-page")
        }
    }, [])
    return (
        <>
            <Suspense fallback={<Prelaod />}>{<Outlet />}</Suspense>
        </>
    )
}

export default Authlayout