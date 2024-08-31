import { FormControl, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { FindingProperyType, FindingState, FindingType } from "../../types";

type Props = {
  onAdd(finding: FindingType): void;
  onClose(): void;
  finding?: FindingState;
  updateFinding: (
    property: FindingProperyType,
    value: FindingState[FindingProperyType]
  ) => void;
};

export function CreateFinding(props: Props) {
  const { onAdd, onClose, finding, updateFinding } = props;

  function onSubmit() {
    if (finding) {
      onAdd({
        id: finding.id || 0,
        type: finding.type || "",
        ruleId: finding.ruleId || "",
        location: {
          path: finding.path || "",
          positions: {
            begin: {
              line: finding.line || 0,
            },
          },
        },
        metadata: {
          description: finding.description || "",
          severity: finding.severity || "",
        },
      });
      onClose();
    }
  }

  useEffect(() => {
    if (!finding) {
      updateFinding("id", new Date().getTime());
    }
  }, [finding]);

  return (
    <section className="py-2 flex flex-col gap-5">
      <FormControl fullWidth>
        <TextField
          onChange={(e) => updateFinding("type", e.target.value as string)}
          label="Type"
          value={finding?.type}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          onChange={(e) => updateFinding("ruleId", e.target.value as string)}
          label="RuleID"
          value={finding?.ruleId}
          variant="outlined"
        />
      </FormControl>

      <div className=" border-dashed p-2 border">
        <Typography>Location</Typography>
        <div className="flex flex-col gap-2">
          <FormControl fullWidth>
            <TextField
              onChange={(e) => updateFinding("path", e.target.value as string)}
              value={finding?.path}
              label="Path"
              variant="outlined"
            />
          </FormControl>
          <Typography>Positions : begin</Typography>
          <FormControl fullWidth>
            <TextField
              onChange={(e) => updateFinding("line", Number(e.target.value))}
              value={finding?.line}
              type="number"
              label="Line"
              variant="outlined"
            />
          </FormControl>
        </div>
      </div>

      <div className=" border-dashed p-2 border">
        <Typography>Metadata</Typography>
        <div className="flex flex-col gap-2">
          <FormControl fullWidth>
            <TextField
              onChange={(e) =>
                updateFinding("description", e.target.value as string)
              }
              value={finding?.description}
              label="Description"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              onChange={(e) =>
                updateFinding("severity", e.target.value as string)
              }
              value={finding?.severity}
              label="Severity"
              variant="outlined"
            />
          </FormControl>
        </div>
      </div>

      <div className="flex items-end justify-end">
        <button onClick={onSubmit}>Add</button>
      </div>
    </section>
  );
}
