import { Clients } from "./Clients";
import { Config } from "./Config";
import { Schedules } from "./Schedules";

type boardProps = {
  currentBoard: React.ReactNode;
};

export function Board({ currentBoard }: boardProps) {
  return <>{currentBoard}</>;
}
