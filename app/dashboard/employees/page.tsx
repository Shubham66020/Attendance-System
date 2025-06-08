"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import { useAuth, type UserRole } from "@/contexts/AuthContext"
import { Search, Plus, Edit, Trash2, Users } from "lucide-react"
import { mockEmployees, type Employee } from "@/lib/data"

export default function EmployeesPage() {
  const { user } = useAuth()
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Employee" as UserRole,
    status: "Active" as "Active" | "Inactive",
  })

  // Check if user has permission to access this page
  if (user?.role !== "Admin" && user?.role !== "HR") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Access Restricted</h2>
          <p className="text-gray-600 dark:text-gray-400">You don't have permission to view employee management.</p>
        </div>
      </div>
    )
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !roleFilter || employee.role === roleFilter
    return matchesSearch && matchesRole
  })

  const openModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee)
      setFormData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        status: employee.status,
      })
    } else {
      setEditingEmployee(null)
      setFormData({
        name: "",
        email: "",
        role: "Employee",
        status: "Active",
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingEmployee) {
      // Update existing employee
      setEmployees((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...formData } : emp)))
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
      }
      setEmployees((prev) => [...prev, newEmployee])
    }

    setIsModalOpen(false)
  }

  const deleteEmployee = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id))
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your team members and their information.</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="bg-background rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Join Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 text-foreground font-medium">{employee.name}</td>
                  <td className="py-3 px-4 text-foreground">{employee.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.role === "Admin"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : employee.role === "HR"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {employee.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground">{new Date(employee.joinDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(employee)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteEmployee(employee.id)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEmployee ? "Edit Employee" : "Add New Employee"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-foreground">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as UserRole }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              required
            >
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-foreground">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as "Active" | "Inactive" }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingEmployee ? "Update" : "Add"} Employee
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
