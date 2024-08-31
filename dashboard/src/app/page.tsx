"use client";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import IconButton from "@mui/material/IconButton";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { CreateField } from "./components/CreateField";
export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full max-w-xs mx-auto my-10 flex flex-col justify-between gap-5">
      <Typography variant="h1" fontSize={"20px"} className="text-left mx-auto">
        Submit a scan result
      </Typography>
      <Box className="shadow rounded">
        <form className="p-5 flex flex-col gap-2">
          <div className="mb-4">
            <FormControl fullWidth>
              <InputLabel id="scan-status-select">Scan status</InputLabel>
              <Select
                id="scan-status-select"
                labelId="scan-status"
                value={"f"}
                label="Scan status"
                //onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>

          <FormControl fullWidth>
            <TextField
              id="scan-repository-name"
              label="Repository name"
              variant="outlined"
            />
          </FormControl>

          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <span>Add fields</span>
            <IconButton>
              <ControlPointIcon />
            </IconButton>
          </div>

          <FormControl fullWidth>
            <DateTimePicker label="QueuedAt" />
          </FormControl>

          <FormControl fullWidth>
            <DateTimePicker label="ScanningAt" />
          </FormControl>

          <FormControl fullWidth>
            <DateTimePicker label="FinishedAt" />
          </FormControl>

          <div className="flex items-end justify-end">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-white max-w-fit m-auto mt-2.5 rounded p-5">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new field
          </Typography>
          <CreateField />
        </Box>
      </Modal>
    </section>
  );
}
