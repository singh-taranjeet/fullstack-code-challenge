"use client";
import { Box, Tabs, Tab } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname === "/") {
      setValue(0);
    } else if (pathname.includes("/results")) {
      setValue(1);
    }
  }, [pathname]);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs centered value={value}>
        <Tab label="Create scan result" onClick={() => router.push("/")}></Tab>
        <Tab
          label="View scan results"
          onClick={() => router.push("/results")}
        />
      </Tabs>
    </Box>
  );
}
