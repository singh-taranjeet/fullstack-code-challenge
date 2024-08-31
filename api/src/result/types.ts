interface Finding {
  type: string;
  ruleId: string;
  location: {
    path: string;
    positions: {
      begin: {
        line: number;
      };
    };
  };
  metadata: {
    description: string;
    severity: string;
  };
}

export enum StatusType {
  QUEUED = 'Queued',
  IN_PROGRESS = 'In Progress',
  SUCCESS = 'Success',
  FAILURE = 'Failure',
}

export type Findings = Finding[];
