import React from "react";
import {
  Activity, LayoutDashboard, Users, CalendarDays,
  Stethoscope, FlaskConical, Pill, Settings,
  Bell, Search, HeartPulse, ArrowUpRight
} from "lucide-react";
import "./App.css";
import useDashboardStats from "./useDashboardStats";

const stats = [
  { title: "Total Patients", value: "1,284", icon: Users, color: "blue" },
  { title: "Doctors", value: "86", icon: Stethoscope, color: "purple" },
  { title: "Appointments", value: "342", icon: CalendarDays, color: "green" },
  { title: "Lab Reports", value: "196", icon: FlaskConical, color: "orange" }
];

const menu = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Patients", icon: Users },
  { name: "Doctors", icon: Stethoscope },
  { name: "Appointments", icon: CalendarDays },
  { name: "Laboratory", icon: FlaskConical },
  { name: "Pharmacy", icon: Pill },
  { name: "Settings", icon: Settings }
];

function App() {
  const { stats: liveStats, loading, error } = useDashboardStats();
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><HeartPulse /></div>
          <div><h2>MediVault <span>AI</span></h2><small>Healthcare Ecosystem</small></div>
        </div>

        <p className="menu-label">WORKSPACE</p>
        <nav>
          {menu.map((item, index) => (
            <div className={`menu-item ${index === 0 ? "active" : ""}`} key={item.name}>
              <item.icon size={19} />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <Activity size={20} />
          <div><b>System Status</b><small>Demo environment</small></div>
          <span className="status-dot"></span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search"><Search size={18} /><input placeholder="Search patients, doctors..." /></div>
          <button className="bell"><Bell size={20} /></button>
          <div className="profile"><div className="avatar">A</div><div><b>Admin</b><small>Administrator</small></div></div>
        </header>

        <section className="content">
          <div className="welcome">
            <div><p className="eyebrow">OVERVIEW</p><h1>Healthcare Dashboard</h1><p>Welcome to your MediVault AI workspace.</p></div>
            <button className="date-btn"><CalendarDays size={17} /> November 2026</button>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.title}>
                <div className={`stat-icon ${stat.color}`}><stat.icon size={22} /></div>
                <p>{stat.title}</p>
                <div className="stat-bottom"><h2>{loading ? "..." : stat.title === "Total Patients" ? liveStats.totalPatients : stat.title === "Doctors" ? liveStats.totalDoctors : stat.title === "Appointments" ? liveStats.totalAppointments : stat.value}</h2><span><ArrowUpRight size={15} /> Demo</span></div>
              </div>
            ))}
          </div>

          <div className="section-heading"><h2>Today's Overview</h2><span>Sample data</span></div>

          <div className="overview-grid">
            <div className="panel">
              <div className="panel-title"><h3>Recent Appointments</h3><button>View all →</button></div>
              {[
                ["Demo Patient 01", "General Medicine", "09:30 AM", "Scheduled"],
                ["Demo Patient 02", "Cardiology", "10:15 AM", "Completed"],
                ["Demo Patient 03", "Neurology", "11:00 AM", "Scheduled"],
                ["Demo Patient 04", "Dermatology", "12:30 PM", "Scheduled"]
              ].map((row) => (
                <div className="appointment" key={row[0]}>
                  <div className="patient-avatar"><Users size={18} /></div>
                  <div className="patient-info"><b>{row[0]}</b><small>{row[1]}</small></div>
                  <span className="appointment-time">{row[2]}</span>
                  <span className={`badge ${row[3].toLowerCase()}`}>{row[3]}</span>
                </div>
              ))}
            </div>

            <div className="panel health-panel">
              <div className="panel-title"><h3>Platform Modules</h3><Activity size={20} /></div>
              <div className="module"><div className="module-icon blue"><Users /></div><div><b>Patient Management</b><small>Patient records and profiles</small></div><span className="module-status">API Setup</span></div>
              <div className="module"><div className="module-icon purple"><Stethoscope /></div><div><b>Doctor Management</b><small>Doctor profiles and specialties</small></div><span className="module-status">API Setup</span></div>
              <div className="module"><div className="module-icon green"><CalendarDays /></div><div><b>Appointments</b><small>Scheduling and management</small></div><span className="module-status">API Setup</span></div>
              <div className="module"><div className="module-icon orange"><FlaskConical /></div><div><b>Laboratory</b><small>Reports and test management</small></div><span className="module-status pending">Planned</span></div>
            </div>
          </div>

          <div className="footer-note"><HeartPulse size={16} /> MediVault AI · Educational demo using fictional sample data</div>
        </section>
      </main>
    </div>
  );
}

export default App;
