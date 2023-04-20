import {Dialog} from "@mui/material"

import RoundedButton from "../Button/RoundedButton"
import WarningAlertIcon from "../../assets/images/WarningAlert.svg"

const DeleteConfirmationDialog = (props) => {
  const {open, onClose, type = "activity", name = "", onConfirm} = props

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="xs"
      data-cy="modal-delete"
    >
      <div className="p-8 flex flex-col items-center text-center gap-8">
        <img
          src={WarningAlertIcon}
          alt="warning-alert"
          data-cy="modal-delete-icon"
        />
        <div className="text-xl" data-cy="modal-delete-title">
          Apakah anda yakin menghapus {type}{" "}
          <span className="font-bold">{name}?</span>
        </div>
        <div className="flex gap-8">
          <RoundedButton
            variant="contained"
            className="font-semibold"
            color="inherit"
            onClick={onClose}
            data-cy="modal-delete-cancel-button"
          >
            Batal
          </RoundedButton>
          <RoundedButton
            variant="contained"
            className="font-semibold"
            color="error"
            onClick={onConfirm}
            data-cy="modal-delete-confirm-button"
          >
            Hapus
          </RoundedButton>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteConfirmationDialog
