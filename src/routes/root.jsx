import React from "react"

import Dashboard from "../pages/dashboard/dashboard"
import ListItem from "../pages/ListItem/listItem"

const Routes = [
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/detail/:id",
    element: <ListItem />
  }
]

export default Routes
