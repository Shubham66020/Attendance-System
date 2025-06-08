"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { User, Lock, Palette, Bell } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    attendance: true,
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    alert("Profile updated successfully!")
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    // In a real app, this would make an API call
    alert("Password changed successfully!")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Information
          </h3>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              label="Full Name"
              value={profileData.name}
              onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />

            <div className="pt-2">
              <Button type="submit" size="sm">
                Update Profile
              </Button>
            </div>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </h3>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
              showPasswordToggle
              required
            />

            <Input
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
              showPasswordToggle
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              showPasswordToggle
              required
            />

            <div className="pt-2">
              <Button type="submit" size="sm">
                Change Password
              </Button>
            </div>
          </form>
        </div>

        {/* Theme Settings */}
        <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Appearance
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toggle between light and dark themes</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDark ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, email: !prev.email }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.email ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.email ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive browser notifications</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, push: !prev.push }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.push ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.push ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Attendance Reminders</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Daily attendance notifications</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, attendance: !prev.attendance }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.attendance ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.attendance ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
