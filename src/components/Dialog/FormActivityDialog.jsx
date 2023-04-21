import {IconButton, Dialog, Divider, TextField, MenuItem} from "@mui/material"
import {PRIORITY} from "../../utils/constans"

import CloseIcon from "@mui/icons-material/Close"
import RoundedButton from "../Button/RoundedButton"

const FormActivityDialog = (props) => {
  const {open, onClose, type = "add", value, onChange, onSubmit} = props
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
      data-cy="modal-add"
    >
      <div className="flex justify-between p-4">
        <div className="font-bold" data-cy="modal-add-title">
          {type === "edit" ? "Edit" : "Tambah List"} Item
        </div>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => onClose()}
          data-cy="moda-add-close-button"
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>
      <Divider />
      <div autoComplete="off" className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div
            className="font-semibold uppercase text-sm"
            data-cy="modal-add-name-title"
          >
            Nama List Item
          </div>
          <TextField
            required
            placeholder="Tambahkan nama list item"
            fullWidth
            value={value.title}
            onChange={onChange("title")}
            data-cy="modal-add-name-input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="font-semibold uppercase text-sm"
            data-cy="modal-add-priority-title"
          >
            Priority
          </div>
          <TextField
            id="outlined-select-currency-native"
            select
            required
            className="w-1/2"
            value={value.priority}
            onChange={onChange("priority")}
            data-cy="modal-add-priority-dropdown"
          >
            {PRIORITY.map((option) => (
              <MenuItem
                value={option.value}
                key={option.value}
                data-cy="modal-add-priority-item"
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <Divider />
      <div className="flex justify-end p-4">
        <RoundedButton
          type="submit"
          variant="contained"
          className="font-semibold"
          onClick={onSubmit}
          disabled={!value.title || !value.priority}
          data-cy="modal-add-save-button"
        >
          + Tambah
        </RoundedButton>
      </div>
    </Dialog>
  )
}

export default FormActivityDialog
