"use client";
import { gql, useQuery } from "@apollo/client";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { List } from "./components/List";
import { Findings } from "./components/Findings";
import { Loading } from "../components/Loading";

export default function Results() {
  const [selectedScan, setSelectedScan] = useState<number | undefined>();

  const GetScanResultsQuery = gql`
    query Results {
      Results {
        id
        status
        repositoryName
        queuedAt
        scanningAt
        finishedAt
        findings {
          ruleId
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GetScanResultsQuery, {
    fetchPolicy: "no-cache",
  });

  function onSelectedResult(id: number) {
    setSelectedScan(id);
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-col gap-5 mx-5">
      {selectedScan ? (
        <div className="flex gap-2 items-center">
          <IconButton onClick={() => setSelectedScan(undefined)}>
            <ArrowBackIcon />
          </IconButton>
          Scan id {selectedScan}
        </div>
      ) : (
        <h1>Results</h1>
      )}

      {loading ? <Loading /> : null}

      {selectedScan ? (
        <Findings id={selectedScan} />
      ) : (
        <List onSelect={onSelectedResult} results={data?.Results} />
      )}
    </div>
  );
}
