import {  Snackbar } from '@mui/material'
import { useState } from 'react'
import ContentCopyIcon from "@mui/icons-material/ContentCopy";


const CopyToClipboardButton = (props) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(props.text)
    }
    
    return (
        <>
        <ContentCopyIcon className="pointer" onClick={handleClick}  style={props.primaryFont} ></ContentCopyIcon>
          <Snackbar
            open={open}
            anchorOrigin={props.position}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="✅ Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboardButton