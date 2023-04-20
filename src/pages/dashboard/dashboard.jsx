import React from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

import {Paper, Grid, IconButton, Snackbar} from "@mui/material"
import MuiAlert from "@mui/material/Alert"

import global from "../../utils/global-variables"

import DeleteIcon from "@mui/icons-material/Delete"
import DashboardEmptyState from "../../components/DashboardEmptyState"
import RoundedButton from "../../components/Button/RoundedButton"
import DeleteConfirmationDialog from "../../components/Dialog/DeleteConfirmationDialog"

const initialDelete = {id: 0, name: "", open: false}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Dashboard = () => {
  const navigate = useNavigate()

  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [list, setList] = React.useState([])
  const [deleteData, setDeleteData] = React.useState(initialDelete)

  React.useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios
      .get(`${global.BASE_URL}/activity-groups?email=${global.BASE_EMAIL}`)
      .then((res) => {
        setList(res.data.data)
      })
  }

  const onAddActivity = () => {
    axios
      .post(`${global.BASE_URL}/activity-groups`, {
        title: "New Activity",
        email: global.BASE_EMAIL
      })
      .then(() => {
        getData()
      })
  }

  const setDelete = (id, name) => {
    setDeleteData({id, name, open: true})
  }

  const onClearDelete = () => {
    setDeleteData(initialDelete)
  }

  const onDelete = () => {
    axios
      .delete(`${global.BASE_URL}/activity-groups/${deleteData.id}`)
      .then(() => {
        onClearDelete()
        getData()
        setOpenSnackbar(true)
      })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <div className="font-bold text-2xl" data-cy="activity-title">
          Activity
        </div>
        <RoundedButton
          variant="contained"
          className="font-semibold"
          onClick={() => onAddActivity()}
          data-cy="activity-add-button"
        >
          + Tambah
        </RoundedButton>
      </div>
      {list.length > 0 ? (
        <Grid container spacing={2}>
          {list.map((val) => {
            return (
              <Grid item xs={12} md={3} key={val.id} data-cy="activity-item">
                <Paper
                  elevation={3}
                  className="h-56 p-4 flex flex-col justify-between cursor-pointer"
                  onClick={() => navigate(`/detail/${val.id}`)}
                >
                  <div
                    className="font-bold text-clip overflow-hidden"
                    data-cy="activity-item-title"
                  >
                    {val.title}
                  </div>
                  <div className="flex justify-between mt-4">
                    <div
                      className="text-sm text-gray-500"
                      data-cy="activity-item-date"
                    >
                      {new Date(val.created_at).toLocaleString("id-ID", {
                        dateStyle: "medium"
                      })}
                    </div>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDelete(val.id, val.title)
                      }}
                      data-cy="activity-item-delete-button"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      ) : (
        <DashboardEmptyState />
      )}
      <DeleteConfirmationDialog
        {...deleteData}
        onClose={() => onClearDelete()}
        onConfirm={() => onDelete()}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{width: "100%"}}
        >
          Activity berhasil dihapus
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Dashboard
