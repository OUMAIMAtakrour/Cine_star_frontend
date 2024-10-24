import React, { useState } from "react";
import MoviesManagement from "./MovieManagement";

const IconHome = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const IconFilm = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
    />
  </svg>
);

const IconTv = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const IconSettings = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const StatCard = ({ title, value, description, icon: Icon }) => (
  <div className="bg-black rounded-lg shadow-md p-6 flex items-center">
    <div className="mr-4 text-blue-500">
      <Icon />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-2xl font-bold text-blue-500">{value}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </div>
);

const Sidebar = ({ activeItem, setActiveItem }) => {
  const items = [
    { name: "Dashboard", icon: IconHome },
    { name: "Movies", icon: IconFilm },
    { name: "Series", icon: IconTv },
    { name: "Users", icon: IconUsers },
    { name: "Settings", icon: IconSettings },
  ];

  return (
    <div className="w-64 bg-gray-600  shadow-3xl">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-blue-500">Cinema Admin</h2>
      </div>
      <nav>
        {items.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-4 cursor-pointer ${
              activeItem === item.name
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <item.icon />
            <span className="ml-2">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

const generateDummyData = () => {
  return [
    { name: "Jan", movies: 4000, series: 2400, amt: 2400 },
    { name: "Feb", movies: 3000, series: 1398, amt: 2210 },
    { name: "Mar", movies: 2000, series: 9800, amt: 2290 },
    { name: "Apr", movies: 2780, series: 3908, amt: 2000 },
    { name: "May", movies: 1890, series: 4800, amt: 2181 },
    { name: "Jun", movies: 2390, series: 3800, amt: 2500 },
  ];
};

const CinemaAdminDashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const data = generateDummyData();

  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-500">
          Cinema Admin Dashboard
        </h1>

        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Users"
            value="10,482"
            description="+20.1% from last month"
            icon={IconUsers}
          />
          <StatCard
            title="Active Subscriptions"
            value="4,582"
            description="+12.9% from last month"
            icon={IconTv}
          />
          <StatCard
            title="Movies"
            value="348"
            description="+8.4% from last month"
            icon={IconFilm}
          />
          <StatCard
            title="Settings"
            value="Manage"
            description="Configure system settings"
            icon={IconSettings}
          />
        </div>

        {activeItem === "Movies" && <MoviesManagement />}
      </div>
    </div>
  );
};

export default CinemaAdminDashboard;
