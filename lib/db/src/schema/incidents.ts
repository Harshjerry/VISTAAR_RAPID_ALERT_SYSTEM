import { pgTable, serial, text, doublePrecision, integer, timestamp } from "drizzle-orm/pg-core";

export const incidentsTable = pgTable("incidents", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("active"),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  address: text("address"),
  reporter: text("reporter"),
  source: text("source").notNull().default("user_report"),
  externalId: text("external_id"),
  url: text("url"),
  reportCount: integer("report_count").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export type Incident = typeof incidentsTable.$inferSelect;
export type InsertIncident = typeof incidentsTable.$inferInsert;
