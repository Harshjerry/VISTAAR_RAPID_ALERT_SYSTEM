import { pgTable, serial, text, doublePrecision, timestamp } from "drizzle-orm/pg-core";

export const locationPingsTable = pgTable("location_pings", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  speed: doublePrecision("speed").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type LocationPing = typeof locationPingsTable.$inferSelect;
export type InsertLocationPing = typeof locationPingsTable.$inferInsert;
