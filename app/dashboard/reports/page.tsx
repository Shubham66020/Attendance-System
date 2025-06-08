"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-01-31",
  })

  // Mock chart data
  const chartData = [
    { date: "2024-01-01", employees: 20 },
    { date: "2024-01-02", employees: 22 },
    { date: "2024-01-03", employees: 21 },
    { date: "2024-01-04", employees: 23 },
    { date: "2024-01-05", employees: 24 },
    { date: "2024-01-08", employees: 22 },
    { date: "2024-01-09", employees: 23 },
  ]

  const maxEmployees = Math.max(...chartData.map((d) => d.employees))

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">View attendance analytics and team insights.</p>
      </div>

      <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Average Attendance</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">92.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Present Days</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">156</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Hours/Day</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">8.2</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Daily Attendance Overview
          </h3>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-end space-x-2 h-64">
              {chartData.map((data, index) => (
                <div key={data.date} className="flex-1 flex flex-col items-center">
                  <div
                    className="bg-primary rounded-t w-full transition-all duration-300 hover:bg-secondary"
                    style={{
                      height: `${(data.employees / maxEmployees) * 200}px`,
                      minHeight: "20px",
                    }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                    <div className="font-medium">{data.employees}</div>
                    <div>{new Date(data.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Department Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Engineering</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">HR</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">90%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Marketing</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">85%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Attendance improved by 5%</p>
                <p className="text-xs text-gray-500">Compared to last month</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Average work hours stable</p>
                <p className="text-xs text-gray-500">8.2 hours per day</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">3 late arrivals this week</p>
                <p className="text-xs text-gray-500">Down from 7 last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
