"use client"
import { useAuth } from "@/contexts/AuthContext"
import { Clock, Users, BarChart3, CheckCircle } from "lucide-react"

export default function DashboardHome() {
  const { user } = useAuth()

  const stats = [
    {
      name: "Total Employees",
      value: "24",
      icon: Users,
      color: "bg-blue-500",
      change: "+2 this month",
    },
    {
      name: "Present Today",
      value: "22",
      icon: CheckCircle,
      color: "bg-green-500",
      change: "91.7% attendance",
    },
    {
      name: "Hours Worked",
      value: "176",
      icon: Clock,
      color: "bg-purple-500",
      change: "This month",
    },
    {
      name: "Projects Active",
      value: "8",
      icon: BarChart3,
      color: "bg-orange-500",
      change: "3 completed",
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening at Devsync today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">John marked attendance at 9:00 AM</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">New employee Sarah joined HR department</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly report generated successfully</p>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <p className="font-medium text-foreground">Mark Attendance</p>
              <p className="text-sm text-gray-500">Clock in for today</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <p className="font-medium text-foreground">View Reports</p>
              <p className="text-sm text-gray-500">Check attendance analytics</p>
            </button>
            {(user?.role === "Admin" || user?.role === "HR") && (
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <p className="font-medium text-foreground">Manage Employees</p>
                <p className="text-sm text-gray-500">Add or edit employee records</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
