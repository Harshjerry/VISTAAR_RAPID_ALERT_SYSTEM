import { pgTable, serial, text, doublePrecision, integer, timestamp } from "drizzle-orm/pg-core";

export const trafficStagnationTable = pgTable("traffic_stagnation", {
  id: serial("id").primaryKey(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  radius: doublePrecision("radius").notNull(),
  stagnantMinutes: integer("stagnant_minutes").notNull(),
  vehicleCount: integer("vehicle_count").notNull(),
  suspicionScore: doublePrecision("suspicion_score").notNull(),
  roadName: text("road_name"),
  detectedAt: timestamp("detected_at", { withTimezone: true }).notNull().defaultNow(),
});

export type TrafficStagnation = typeof trafficStagnationTable.$inferSelect;
export type InsertTrafficStagnation = typeof trafficStagnationTable.$inferInsert;
