import { useEffect, useState } from "react";
import api from "./api";

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/dashboard/stats")
      .then((response) => {
        setStats(response.data.stats);
      })
      .catch(() => {
        setError("Backend connection unavailable");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { stats, loading, error };
}
