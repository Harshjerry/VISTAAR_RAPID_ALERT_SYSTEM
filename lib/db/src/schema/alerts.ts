import { pgTable, serial, text, doublePrecision, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const alertsTable = pgTable("alerts", {
  id: serial("id").primaryKey(),
  severity: text("severity").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  category: text("category").notNull().default("incident"),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  radius: doublePrecision("radius").notNull(),
  active: boolean("active").notNull().default(true),
  source: text("source").notNull().default("system"),
  externalId: text("external_id"),
  url: text("url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  affectedUsers: integer("affected_users").notNull().default(0),
});

export type Alert = typeof alertsTable.$inferSelect;
export type InsertAlert = typeof alertsTable.$inferInsert;
