import { Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ItemContainer, Label, Timestamp } from "../index";
import { Container } from "../Container";

export function List(props: { onSelect(id: number): void; results?: any }) {
  const { onSelect, results } = props;

  return (
    <div className="flex flex-col gap-5">
      {results?.map((result: any, index: number) => (
        <Container
          key={`${result.id}-${index}`}
          onClick={() => onSelect(result.id)}
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
        </Container>
      ))}
    </div>
  );
}
