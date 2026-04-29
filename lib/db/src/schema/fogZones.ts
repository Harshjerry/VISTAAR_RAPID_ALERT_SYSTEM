import { pgTable, serial, text, doublePrecision, integer, timestamp } from "drizzle-orm/pg-core";

export const fogZonesTable = pgTable("fog_zones", {
  id: serial("id").primaryKey(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  radius: doublePrecision("radius").notNull(),
  visibilityMeters: integer("visibility_meters").notNull(),
  severity: text("severity").notNull(),
  roadName: text("road_name"),
  detectedAt: timestamp("detected_at", { withTimezone: true }).notNull().defaultNow(),
});

export type FogZone = typeof fogZonesTable.$inferSelect;
export type InsertFogZone = typeof fogZonesTable.$inferInsert;
