"use client";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import IconButton from "@mui/material/IconButton";
import { Badge, Button, Modal, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { CreateFinding } from "./components/CreateFinding";
import {
  FindingProperyType,
  FindingState,
  FindingType,
  ProperyType,
  ResultState,
} from "./types";
import { gql, useMutation } from "@apollo/client";

const CreateResultScanQuery = gql`
  mutation CreateResult($createResultInput: CreateResultDto!) {
    createResult(createResultInput: $createResultInput) {
      id
    }
  }
`;

export default function Home() {
  const [open, setOpen] = useState(false);

  const [createResultsScanMutation] = useMutation(CreateResultScanQuery);

  const [result, setResult] = useState<ResultState | undefined>();
  function updateResult(
    property: ProperyType,
    value: ResultState[ProperyType]
  ) {
    setResult((prev) => {
      return {
        ...prev,
        [property]: value,
      };
    });
  }

  const [finding, setFinding] = useState<FindingState | undefined>();

  function updateFinding(
    property: FindingProperyType,
    value: FindingState[FindingProperyType]
  ) {
    setFinding((prev) => {
      return {
        ...prev,
        [property]: value,
      };
    });
  }

  function onAddFinding(finding: FindingType) {
    const index = result?.findings?.findIndex((f) => f.id === finding.id);

    if (index === -1 || index === undefined) {
      setResult((prev) => {
        return {
          ...prev,
          findings: [...(prev?.findings || []), finding],
        };
      });
    } else {
      // if finding of ruleId already exists, update the finding
      setResult((prev) => {
        return {
          ...prev,
          findings:
            prev?.findings?.map((f, i) => {
              if (i === index) {
                return finding;
              }
              return f;
            }) || [],
        };
      });
    }
    setFinding(undefined);
  }

  function createResult() {
    createResultsScanMutation({
      variables: {
        createResultInput: {
          status: result?.status,
          repositoryName: result?.repositoryName,
          queuedAt: result?.queuedAt,
          scanningAt: result?.scanningAt,
          finishedAt: result?.finishedAt,
          findings: result?.findings?.map((f) => {
            return {
              ...f,
              id: undefined,
            };
          }), // remove id from finding
        },
      },
      onCompleted: (data) => {
        alert("Result created successfully");
        setResult(undefined);
      },
    });
  }

  function setFindingEdit(finding: FindingType) {
    setFinding({
      id: finding.id,
      type: finding.type,
      ruleId: finding.ruleId,
      path: finding.location.path,
      line: finding.location.positions.begin.line,
      description: finding.metadata.description,
      severity: finding.metadata.severity,
    });
    openModal();
  }

  function openModal() {
    setOpen(true);
  }

  function modalClose() {
    setOpen(false);
    setFinding(undefined);
  }

  function removeFinding(id: number) {
    setResult((prev) => {
      return {
        ...prev,
        findings: prev?.findings?.filter((f) => f.id !== id),
      };
    });
  }

  return (
    <section className="w-full mx-auto my-10 flex flex-col justify-between gap-5 px-5 sm:p-0">
      <Typography variant="h1" fontSize={"20px"} className="text-left mx-auto">
        Submit a scan result
      </Typography>
      <Box className="border rounded">
        <form className="p-5 flex flex-col justify-between gap-5">
          <div className="sm:grid grid-cols-2  gap-5 flex flex-col">
            <FormControl fullWidth>
              <InputLabel id="scan-status-select">Scan status</InputLabel>
              <Select
                id="scan-status-select"
                labelId="scan-status"
                value={result?.status || ""}
                label="Scan status"
                onChange={(e) =>
                  updateResult("status", e.target.value as string)
                }
              >
                <MenuItem value={"Queued"}>Queued</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Success"}>Success</MenuItem>
                <MenuItem value={"Failure"}>Failure</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <TextField
                id="scan-repository-name"
                label="Repository name"
                variant="outlined"
                value={result?.repositoryName || ""}
                onChange={(e) => updateResult("repositoryName", e.target.value)}
              />
            </FormControl>

            <ResultFindings
              removeFinding={removeFinding}
              result={result}
              onAddField={openModal}
              setFindingEdit={setFindingEdit}
            />

            <FormControl>
              <DateTimePicker
                onChange={(newValue) =>
                  updateResult("queuedAt", newValue || undefined)
                }
                value={result?.queuedAt}
                label="QueuedAt"
              />
            </FormControl>

            <FormControl>
              <DateTimePicker
                onChange={(newValue) =>
                  updateResult("scanningAt", newValue || undefined)
                }
                value={result?.scanningAt}
                label="ScanningAt"
              />
            </FormControl>

            <FormControl>
              <DateTimePicker
                onChange={(newValue) =>
                  updateResult("finishedAt", newValue || undefined)
                }
                value={result?.finishedAt}
                label="FinishedAt"
              />
            </FormControl>
          </div>

          <div className="flex items-end justify-end">
            <Button variant="contained" onClick={createResult}>
              Submit
            </Button>
          </div>
        </form>
      </Box>

      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-white max-w-fit m-auto mt-2.5 rounded p-5">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new field
          </Typography>
          <CreateFinding
            finding={finding}
            updateFinding={updateFinding}
            onAdd={onAddFinding}
            onClose={modalClose}
          />
        </Box>
      </Modal>
    </section>
  );
}

function ResultFindings(props: {
  result?: ResultState;
  removeFinding: (id: number) => void;
  setFindingEdit: (finding: FindingType) => void;
  onAddField(): void;
}) {
  const { result, removeFinding, setFindingEdit, onAddField } = props;

  return (
    <div>
      {result?.findings?.length ? <Typography>Added fields</Typography> : null}
      <div className="flex flex-wrap gap-2">
        {result?.findings?.map((finding) => (
          <div key={finding.id} className="py-2">
            <Badge
              badgeContent={
                <div
                  className="cursor-pointer bg-white rounded-full border"
                  title="remove"
                  onClick={() => removeFinding(finding.id)}
                >
                  <CloseIcon />
                </div>
              }
            >
              <div
                className="flex gap-1 px-3 py-2 border rounded "
                onClick={() => setFindingEdit(finding)}
              >
                <SearchIcon></SearchIcon>
                <span>{finding.ruleId}</span>
              </div>
            </Badge>
          </div>
        ))}
      </div>
      <div onClick={onAddField} className="cursor-pointer">
        <span>Add fields</span>
        <IconButton>
          <ControlPointIcon />
        </IconButton>
      </div>
    </div>
  );
}
