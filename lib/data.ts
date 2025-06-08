export interface Employee {
  id: string
  name: string
  email: string
  role: "Admin" | "HR" | "Employee"
  status: "Active" | "Inactive"
  joinDate: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  date: string
  checkIn: string
  checkOut?: string
  status: "Present" | "Absent" | "Late"
}

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.admin@devsync.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.hr@devsync.com",
    role: "HR",
    status: "Active",
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.dev@devsync.com",
    role: "Employee",
    status: "Active",
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.dev@devsync.com",
    role: "Employee",
    status: "Active",
    joinDate: "2023-04-05",
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert.dev@devsync.com",
    role: "Employee",
    status: "Inactive",
    joinDate: "2023-01-30",
  },
]

export const mockAttendance: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "1",
    date: "2024-01-15",
    checkIn: "09:00",
    checkOut: "17:30",
    status: "Present",
  },
  {
    id: "2",
    employeeId: "1",
    date: "2024-01-14",
    checkIn: "09:15",
    checkOut: "17:45",
    status: "Late",
  },
  {
    id: "3",
    employeeId: "1",
    date: "2024-01-13",
    checkIn: "08:45",
    checkOut: "17:15",
    status: "Present",
  },
]
