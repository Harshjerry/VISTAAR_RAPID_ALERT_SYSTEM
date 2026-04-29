import { pgTable, serial, text, doublePrecision, integer, jsonb } from "drizzle-orm/pg-core";

export const safetyZonesTable = pgTable("safety_zones", {
  id: serial("id").primaryKey(),
  roadName: text("road_name").notNull(),
  score: doublePrecision("score").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  radius: doublePrecision("radius").notNull(),
  factors: jsonb("factors").$type<string[]>().notNull().default([]),
  timeOfDayRisk: text("time_of_day_risk").notNull().default("all"),
  incidentCount: integer("incident_count").notNull().default(0),
});

export type SafetyZone = typeof safetyZonesTable.$inferSelect;
export type InsertSafetyZone = typeof safetyZonesTable.$inferInsert;
