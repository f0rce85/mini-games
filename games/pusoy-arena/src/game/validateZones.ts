import type { HandZones } from "../types/hand";

export function areZonesComplete(zones: HandZones): boolean {
  return (
    zones.front.length === 3 &&
    zones.middle.length === 5 &&
    zones.back.length === 5 &&
    zones.unassigned.length === 0
  );
}