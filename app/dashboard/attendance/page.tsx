"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Clock, Calendar, CheckCircle } from "lucide-react"
import { mockAttendance } from "@/lib/data"

export default function AttendancePage() {
  const [todayAttendance, setTodayAttendance] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState("")

  const markAttendance = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
    setTodayAttendance(timeString)
  }

  const filteredAttendance = mockAttendance.filter((record) => !dateFilter || record.date.includes(dateFilter))

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Attendance Tracking</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Track your daily attendance and view history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Today's Attendance
            </h3>

            {todayAttendance ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-lg font-semibold text-foreground">Checked in at</p>
                <p className="text-2xl font-bold text-green-500">{todayAttendance}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't marked attendance today</p>
                <Button onClick={markAttendance} className="w-full">
                  Mark Attendance
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Attendance History
              </h3>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-auto"
                placeholder="Filter by date"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Check In</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Check Out</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-foreground">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-foreground">{record.checkIn}</td>
                      <td className="py-3 px-4 text-foreground">{record.checkOut || "-"}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === "Present"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : record.status === "Late"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
