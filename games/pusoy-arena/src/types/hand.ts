import type { Card } from "./card";

export type HandZoneName = "front" | "middle" | "back" | "unassigned";

export interface HandZones {
    front: Card[];
    middle: Card[];
    back: Card[];
    unassigned: Card[];
}