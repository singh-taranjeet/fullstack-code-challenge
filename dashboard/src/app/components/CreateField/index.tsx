import { FormControl, TextField, Button, Typography } from "@mui/material";

export function CreateField() {
  return (
    <form className="py-2 flex flex-col gap-5">
      <FormControl fullWidth>
        <TextField label="Type" variant="outlined" />
      </FormControl>

      <FormControl fullWidth>
        <TextField label="RuleID" variant="outlined" />
      </FormControl>

      <div className=" border-dashed p-2 border">
        <Typography>Location</Typography>
        <div className="flex flex-col gap-2">
          <FormControl fullWidth>
            <TextField label="Path" variant="outlined" />
          </FormControl>
          <Typography>Positions : begin</Typography>
          <FormControl fullWidth>
            <TextField type="number" label="Line" variant="outlined" />
          </FormControl>
        </div>
      </div>

      <div className=" border-dashed p-2 border">
        <Typography>Metadata</Typography>
        <div className="flex flex-col gap-2">
          <FormControl fullWidth>
            <TextField label="Description" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField label="Severity" variant="outlined" />
          </FormControl>
        </div>
      </div>

      <div className="flex items-end justify-end">
        <Button type="submit" variant="contained">
          Add
        </Button>
      </div>
    </form>
  );
}
