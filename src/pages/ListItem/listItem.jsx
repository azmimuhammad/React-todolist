import React from "react"
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"

import {Paper, IconButton, Checkbox, TextField} from "@mui/material"

import global from "../../utils/global-variables"
import {PriorityColor} from "../../utils/helpers"

import TodoEmptyState from "../../components/TodoEmptyState"
import FormActivityDialog from "../../components/Dialog/FormActivityDialog"
import DeleteConfirmationDialog from "../../components/Dialog/DeleteConfirmationDialog"
import RoundedButton from "../../components/Button/RoundedButton"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import SortIcon from "../../assets/images/Sort.svg"

const initialValue = {
  id: 0,
  title: "",
  priority: ""
}

const initialDelete = {
  id: 0,
  name: "",
  open: false,
  type: ""
}

const Dashboard = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const [detail, setDetail] = React.useState({})
  const [onEditDetail, setOnEditDetail] = React.useState(false)
  const [itemList, setItemList] = React.useState([])
  const [formDialog, setFormDialog] = React.useState({open: false, type: "add"})
  const [tempDelete, setTempDelete] = React.useState(initialDelete)
  const [value, setValue] = React.useState({
    ...initialValue,
    activity_group_id: id
  })

  React.useEffect(() => {
    getList()
    getDetail()
  })

  const getDetail = () => {
    axios.get(`${global.BASE_URL}/activity-groups/${id}`).then((res) => {
      setDetail({
        id: res.data.id,
        created_at: res.data.created_at,
        title: res.data.title
      })
    })
  }

  const getList = () => {
    axios
      .get(`${global.BASE_URL}/todo-items?activity_group_id=${id}`)
      .then((res) => {
        setItemList(res.data.data)
      })
  }

  const onValueChange = (prop) => (event) => {
    setValue({...value, [prop]: event.target.value})
  }

  const onSubmitItem = () => {
    if (formDialog.type === "add") {
      axios.post(`${global.BASE_URL}/todo-items`, value).then(() => {
        getList()
        setValue({...initialValue, activity_group_id: id})
        setFormDialog({...formDialog, open: false})
      })
    } else {
      const variables = {
        title: value.title,
        priority: value.priority
      }

      axios
        .patch(`${global.BASE_URL}/todo-items/${value.id}`, variables)
        .then(() => {
          getList()
          setValue({...initialValue, activity_group_id: id})
          setFormDialog({...formDialog, open: false})
        })
    }
  }

  const onItemDelete = () => {
    axios.delete(`${global.BASE_URL}/todo-items/${tempDelete.id}`).then(() => {
      setTempDelete(initialDelete)
      getList()
    })
  }

  const onSubmitDetail = () => {
    setOnEditDetail(false)
    axios
      .patch(`${global.BASE_URL}/activity-groups/${detail.id}`, {
        title: detail.title
      })
      .then(() => {
        getDetail()
      })
  }

  const onUpdate = (id, variables) => {
    axios.patch(`${global.BASE_URL}/todo-items/${id}`, variables).then(() => {
      getList()
      setValue({...initialValue, activity_group_id: id})
    })
  }

  const setActive = (id, e) => {
    onUpdate(id, {is_active: e.target.checked ? 0 : 1})
  }

  const setEdit = (val) => {
    setFormDialog({open: true, type: "edit"})
    setValue({...value, id: val.id, title: val.title, priority: val.priority})
  }

  const setAdd = () => {
    setFormDialog({open: true, type: "add"})
  }

  return (
    <div className="flex flex-col gap-8" data-cy="activity-item">
      <div className="flex flex-row justify-between">
        <div className="flex gap-2 font-bold text-2xl grow pr-4">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              navigate(-1)
            }}
            data-cy="todo-back-button"
          >
            <NavigateBeforeIcon />
          </IconButton>
          {onEditDetail ? (
            <TextField
              variant="standard"
              fullWidth
              value={detail.title}
              onChange={(e) => setDetail({...detail, title: e.target.value})}
              onBlur={() => onSubmitDetail()}
              data-cy="todo-title"
            />
          ) : (
            <>
              <div data-cy="todo-title">{detail.title || ""}</div>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => setOnEditDetail(true)}
                data-cy="todo-title-edit-button"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <div className="border rounded-full p-2 cursor-pointer">
            <img src={SortIcon} alt="sort" className="w-5" />
          </div>
          <RoundedButton
            variant="contained"
            className="font-semibold"
            color="info"
            onClick={() => setAdd()}
            data-cy="todo-add-button"
          >
            + Tambah
          </RoundedButton>
        </div>
      </div>
      {itemList.length ? (
        <div className="flex flex-col gap-4">
          {itemList.map((val, i) => {
            return (
              <Paper
                className="p-4 flex justify-between"
                val={val.id}
                data-cy={`todo-item-${i}`}
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={val.is_active === 0}
                    onChange={(e) => setActive(val.id, e)}
                    data-cy="todo-item-checkbox"
                  />
                  <div
                    className={`text-3xl text-[${PriorityColor(
                      val.priority
                    )}] pb-1`}
                    data-cy="todo-item-priority-indicator"
                  >
                    &bull;
                  </div>
                  <div
                    className={`font-bold ${
                      val.is_active === 0 && "line-through"
                    }`}
                    data-cy="todo-item-title"
                  >
                    {val.title}
                  </div>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => setEdit(val)}
                    data-cy="todo-item-edit-button"
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </div>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() =>
                    setTempDelete({
                      id: val.id,
                      open: true,
                      name: val.title,
                      type: "List Item"
                    })
                  }
                  data-cy="todo-item-delete-button"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Paper>
            )
          })}
        </div>
      ) : (
        <TodoEmptyState />
      )}

      <FormActivityDialog
        open={formDialog.open}
        onClose={() => setFormDialog({...formDialog, open: false})}
        type={formDialog.type}
        value={value}
        onChange={onValueChange}
        onSubmit={() => onSubmitItem()}
      />
      <DeleteConfirmationDialog
        onClose={() => setTempDelete({...tempDelete, open: false})}
        onConfirm={() => onItemDelete()}
        {...tempDelete}
      />
    </div>
  )
}

export default Dashboard
