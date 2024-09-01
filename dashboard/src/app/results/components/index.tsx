import { format } from "date-fns";

export function Label(props: { children: React.ReactNode }) {
  return <label className="font-bold">{props.children}</label>;
}

export function ItemContainer(props: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-5">{props.children}</div>;
}

export function Timestamp(props: { result: any }) {
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
