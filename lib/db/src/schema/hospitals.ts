import { pgTable, serial, text, doublePrecision, integer, timestamp } from "drizzle-orm/pg-core";

export const hospitalsTable = pgTable("hospitals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull().default("hospital"),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  capacity: integer("capacity").notNull().default(0),
  status: text("status").notNull().default("available"),
  phone: text("phone"),
  address: text("address"),
  lastNotifiedAt: timestamp("last_notified_at", { withTimezone: true }),
  responseTimeMins: integer("response_time_mins"),
});

export type Hospital = typeof hospitalsTable.$inferSelect;
export type InsertHospital = typeof hospitalsTable.$inferInsert;
