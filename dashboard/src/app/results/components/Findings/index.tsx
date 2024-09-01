import { gql, useQuery } from "@apollo/client";
import { Container } from "../Container";
import { ItemContainer, Label } from "..";
import { Loading } from "@/app/components/Loading";

const Get_Findings = gql`
  query Result($id: ID!) {
    result(id: $id) {
      findings {
        ruleId
        metadata {
          severity
          description
        }
        location {
          positions {
            begin {
              line
            }
          }
        }
      }
    }
  }
`;

export function Findings(props: { id: number }) {
  const { id } = props;
  const { data, loading, error } = useQuery(Get_Findings, {
    variables: { id },
  });

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5">
      {data?.result?.findings?.map((finding: any, index: number) => (
        <Container key={`${index}`}>
          <ItemContainer>
            <Label>Rule id</Label>
            <p>{finding.ruleId}</p>
          </ItemContainer>
          <ItemContainer>
            <Label>Description</Label>
            <p>{finding.metadata.description}</p>
          </ItemContainer>

          <ItemContainer>
            <Label>Severity</Label>
            <p>{finding.metadata.severity}</p>
          </ItemContainer>

          <ItemContainer>
            <Label>Findings</Label>
            <p>{finding.location.positions.begin.line}</p>
          </ItemContainer>
        </Container>
      ))}
    </div>
  );
}
