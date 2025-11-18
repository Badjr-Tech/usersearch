"use server";

import { db } from "@/db";
import { demographics, locations, Demographic, Location } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

// Explicitly define Location type to ensure consistency
type LocationType = InferSelectModel<typeof locations>;

// Placeholder for fetching available demographics
export async function getAvailableDemographics(): Promise<Demographic[]> {
  try {
    const allDemographics = await db.query.demographics.findMany();
    return allDemographics;
  } catch (error) {
    console.error("Error fetching demographics:", error);
    return [];
  }
}

// Placeholder for fetching available locations
export async function getAvailableLocations(): Promise<LocationType[]> {
  try {
    const allLocations: LocationType[] = await db.query.locations.findMany();
    return allLocations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}
