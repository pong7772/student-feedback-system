import React from 'react'
import { ToastContainer } from 'react-toastify'
import PageNotAllow from '../role-access'

function page() {
    return (
        <div>
            <ToastContainer />
            <PageNotAllow />
        </div>
    )
}

export default page