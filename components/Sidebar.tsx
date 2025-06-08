"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Clock, Users, BarChart3, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Attendance", href: "/dashboard/attendance", icon: Clock },
  { name: "Employees", href: "/dashboard/employees", icon: Users, roles: ["Admin", "HR"] },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const filteredNavigation = navigation.filter((item) => !item.roles || item.roles.includes(user?.role || "Employee"))

  return (
    <div className="flex flex-col w-64 bg-secondary dark:bg-primary text-white h-screen">
      <div className="flex items-center justify-center h-16 bg-primary dark:bg-secondary">
        <h1 className="text-xl font-bold">Devsync</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive ? "bg-primary dark:bg-accent text-white" : "text-gray-300 hover:bg-accent hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-accent">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-accent hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}
