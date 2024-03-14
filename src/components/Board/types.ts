import { ChipsPositions } from "../App/types.ts";
export interface Props {
    columns: number;
    rows: number;
    chipsPositions: ChipsPositions;
    onTileClick: (id: string) => any;
}