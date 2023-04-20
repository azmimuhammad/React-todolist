import React from "react"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Routes from "../routes/root"

import Navbar from "../components/Navbar"

const style = {
  container: {
    padding: "38px 220px"
  }
}

const router = createBrowserRouter(Routes)

const Layouts = () => {
  return (
    <div>
      <Navbar />
      <div style={style.container}>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default Layouts
