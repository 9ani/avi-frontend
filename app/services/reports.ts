import { ReportSummary } from "../types/report";

// Placeholder service. Will be replaced with real API calls later.
export async function fetchWeeklyReports(): Promise<ReportSummary[]> {
  return [
    { id: "today", title: "Название запроса", createdAt: new Date() },
  ];
}


