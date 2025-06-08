"use client"

import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  showPasswordToggle?: boolean
}

export function Input({
  label,
  error,
  showPasswordToggle = false,
  type = "text",
  className = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState(type)

  React.useEffect(() => {
    if (showPasswordToggle && type === "password") {
      setInputType(showPassword ? "text" : "password")
    }
  }, [showPassword, showPasswordToggle, type])

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${className}`}
          {...props}
        />
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
