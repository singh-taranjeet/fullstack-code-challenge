"use client";
import { gql, useQuery } from "@apollo/client";
import { Badge } from "@mui/material";
import { format } from "date-fns/format";
import SearchIcon from "@mui/icons-material/Search";

function Label(props: { children: React.ReactNode }) {
  return <label className="font-bold">{props.children}</label>;
}

function ItemContainer(props: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-5">{props.children}</div>;
}

function Timestamp(props: { result: any }) {
  const { result } = props;
  if (result.status === "Queued") {
    return (
      <ItemContainer>
        <Label>Queued at</Label>
        <p>{format(new Date(result.queuedAt), "dd/MM/yyyy HH:mm:ss")}</p>
      </ItemContainer>
    );
  } else if (result.status === "In Progress") {
    return (
      <ItemContainer>
        <Label>Scanned at</Label>

        {format(new Date(result.scanningAt), "dd/MM/yyyy HH:mm:ss")}
      </ItemContainer>
    );
  } else if (result.status === "Success") {
    return (
      <ItemContainer>
        <Label>Finished at</Label>
        {format(new Date(result.finishedAt), "dd/MM/yyyy HH:mm:ss")}
      </ItemContainer>
    );
  } else {
    return <p>Unknown</p>;
  }
}

export default function Results() {
  const GetScanResultsQuery = gql`
    query Results {
      Results {
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

  const { data, loading, error } = useQuery(GetScanResultsQuery);

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>Results</h1>
      {loading ? (
        <div className="border border-slate-200 rounded-md p-4 w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-5">
        {data?.Results.map((result: any) => (
          <div
            key={result.repositoryName}
            className="border border-slate-200 rounded-md p-4 w-full mx-auto grid grid-cols-4 gap-2"
          >
            <ItemContainer>
              <Label>Repository Name</Label>
              <p>{result.repositoryName}</p>
            </ItemContainer>
            <ItemContainer>
              <Label>Status</Label>
              <p>{result.status}</p>
            </ItemContainer>

            <ItemContainer>
              <Label>Findings</Label>
              <div className="border w-fit rounded-full p-1">
                <Badge badgeContent={result.findings.length} color="primary">
                  <SearchIcon color="action" />
                </Badge>
              </div>
            </ItemContainer>

            <Timestamp result={result} />
          </div>
        ))}
      </div>
    </div>
  );
}
