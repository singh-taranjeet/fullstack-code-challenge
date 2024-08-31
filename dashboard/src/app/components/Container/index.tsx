"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
export function Container(props: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {props.children}
    </LocalizationProvider>
  );
}
