export interface FindingType {
  id: number;
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
export interface ResultType {
  status: string;
  repositoryName: string;
  findings: FindingType[];
  queuedAt: Date;
  scanningAt: Date;
  finishedAt: Date;
}

export interface FieldType {
  id: number;
  type: string;
  ruleId: string;
  path: string;
  line: number;
  description: string;
  severity: string;
}

export type ResultState = Partial<ResultType>;
export type ProperyType = keyof ResultType;

export type FindingState = Partial<FieldType>;
export type FindingProperyType = keyof FieldType;
