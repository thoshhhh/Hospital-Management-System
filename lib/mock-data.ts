// ============== PATIENTS ==============
export type Patient = {
  id: string
  name: string
  age: number
  gender: "Male" | "Female"
  contact: string
  disease: string
  status: "Admitted" | "Discharged"
  admissionDate: string
  doctor: string
  bloodGroup: string
  address: string
}

export const patients: Patient[] = [
  { id: "P-1001", name: "James Wilson", age: 45, gender: "Male", contact: "+1 555-0101", disease: "Cardiac Arrhythmia", status: "Admitted", admissionDate: "2026-01-15", doctor: "Dr. Sarah Chen", bloodGroup: "O+", address: "123 Oak Street, Springfield" },
  { id: "P-1002", name: "Emily Davis", age: 32, gender: "Female", contact: "+1 555-0102", disease: "Pneumonia", status: "Admitted", admissionDate: "2026-01-28", doctor: "Dr. Michael Brown", bloodGroup: "A+", address: "456 Elm Avenue, Riverside" },
  { id: "P-1003", name: "Robert Martinez", age: 58, gender: "Male", contact: "+1 555-0103", disease: "Type 2 Diabetes", status: "Discharged", admissionDate: "2026-01-05", doctor: "Dr. Sarah Chen", bloodGroup: "B+", address: "789 Pine Road, Lakewood" },
  { id: "P-1004", name: "Sarah Johnson", age: 27, gender: "Female", contact: "+1 555-0104", disease: "Appendicitis", status: "Discharged", admissionDate: "2026-01-20", doctor: "Dr. James Lee", bloodGroup: "AB+", address: "321 Maple Drive, Hillside" },
  { id: "P-1005", name: "Michael Thompson", age: 63, gender: "Male", contact: "+1 555-0105", disease: "Hypertension", status: "Admitted", admissionDate: "2026-02-01", doctor: "Dr. Sarah Chen", bloodGroup: "O-", address: "654 Cedar Lane, Brookfield" },
  { id: "P-1006", name: "Lisa Anderson", age: 41, gender: "Female", contact: "+1 555-0106", disease: "Migraine", status: "Discharged", admissionDate: "2026-01-25", doctor: "Dr. Aisha Patel", bloodGroup: "A-", address: "987 Birch Court, Meadowview" },
  { id: "P-1007", name: "David Brown", age: 52, gender: "Male", contact: "+1 555-0107", disease: "Fractured Femur", status: "Admitted", admissionDate: "2026-02-03", doctor: "Dr. James Lee", bloodGroup: "B-", address: "147 Walnut Street, Greenville" },
  { id: "P-1008", name: "Jennifer White", age: 36, gender: "Female", contact: "+1 555-0108", disease: "Asthma", status: "Discharged", admissionDate: "2026-01-18", doctor: "Dr. Michael Brown", bloodGroup: "O+", address: "258 Spruce Ave, Fairfield" },
]

// ============== DOCTORS ==============
export type Doctor = {
  id: string
  name: string
  specialization: string
  availability: "Available" | "Busy" | "On Leave"
  experience: number
  patients: number
  contact: string
  email: string
}

export const doctors: Doctor[] = [
  { id: "D-001", name: "Dr. Sarah Chen", specialization: "Cardiology", availability: "Available", experience: 15, patients: 48, contact: "+1 555-0201", email: "s.chen@hospital.com" },
  { id: "D-002", name: "Dr. Michael Brown", specialization: "Pulmonology", availability: "Busy", experience: 12, patients: 35, contact: "+1 555-0202", email: "m.brown@hospital.com" },
  { id: "D-003", name: "Dr. James Lee", specialization: "Orthopedics", availability: "Available", experience: 20, patients: 52, contact: "+1 555-0203", email: "j.lee@hospital.com" },
  { id: "D-004", name: "Dr. Aisha Patel", specialization: "Neurology", availability: "On Leave", experience: 8, patients: 28, contact: "+1 555-0204", email: "a.patel@hospital.com" },
  { id: "D-005", name: "Dr. Robert Kim", specialization: "General Surgery", availability: "Available", experience: 18, patients: 61, contact: "+1 555-0205", email: "r.kim@hospital.com" },
  { id: "D-006", name: "Dr. Maria Garcia", specialization: "Pediatrics", availability: "Busy", experience: 10, patients: 42, contact: "+1 555-0206", email: "m.garcia@hospital.com" },
]

// ============== APPOINTMENTS ==============
export type Appointment = {
  id: string
  patient: string
  doctor: string
  date: string
  time: string
  status: "Scheduled" | "Completed" | "Cancelled"
  notes: string
}

export const appointments: Appointment[] = [
  { id: "A-2001", patient: "James Wilson", doctor: "Dr. Sarah Chen", date: "2026-02-09", time: "09:00 AM", status: "Scheduled", notes: "Follow-up cardiac check" },
  { id: "A-2002", patient: "Emily Davis", doctor: "Dr. Michael Brown", date: "2026-02-09", time: "10:30 AM", status: "Scheduled", notes: "Chest X-ray review" },
  { id: "A-2003", patient: "Robert Martinez", doctor: "Dr. Sarah Chen", date: "2026-02-09", time: "11:00 AM", status: "Completed", notes: "Diabetes management review" },
  { id: "A-2004", patient: "Sarah Johnson", doctor: "Dr. James Lee", date: "2026-02-10", time: "09:30 AM", status: "Scheduled", notes: "Post-surgery checkup" },
  { id: "A-2005", patient: "Michael Thompson", doctor: "Dr. Sarah Chen", date: "2026-02-10", time: "02:00 PM", status: "Scheduled", notes: "Blood pressure monitoring" },
  { id: "A-2006", patient: "Lisa Anderson", doctor: "Dr. Aisha Patel", date: "2026-02-08", time: "03:00 PM", status: "Cancelled", notes: "Doctor on leave" },
  { id: "A-2007", patient: "David Brown", doctor: "Dr. James Lee", date: "2026-02-11", time: "10:00 AM", status: "Scheduled", notes: "Fracture follow-up" },
  { id: "A-2008", patient: "Jennifer White", doctor: "Dr. Michael Brown", date: "2026-02-08", time: "11:30 AM", status: "Completed", notes: "Asthma management" },
]

// ============== BILLING ==============
export type Invoice = {
  id: string
  patient: string
  services: string
  amount: number
  date: string
  paymentStatus: "Paid" | "Pending" | "Overdue"
}

export const invoices: Invoice[] = [
  { id: "INV-3001", patient: "James Wilson", services: "Cardiac Consultation, ECG, Blood Test", amount: 1250, date: "2026-02-01", paymentStatus: "Paid" },
  { id: "INV-3002", patient: "Emily Davis", services: "X-Ray, Consultation, Medication", amount: 890, date: "2026-02-02", paymentStatus: "Pending" },
  { id: "INV-3003", patient: "Robert Martinez", services: "Diabetes Screening, Lab Tests", amount: 650, date: "2026-01-28", paymentStatus: "Paid" },
  { id: "INV-3004", patient: "Sarah Johnson", services: "Surgery, Post-Op Care, Room Charges", amount: 4500, date: "2026-01-22", paymentStatus: "Paid" },
  { id: "INV-3005", patient: "Michael Thompson", services: "Consultation, Blood Test, ECG", amount: 780, date: "2026-02-05", paymentStatus: "Overdue" },
  { id: "INV-3006", patient: "David Brown", services: "Orthopedic Surgery, X-Ray, Cast", amount: 3200, date: "2026-02-04", paymentStatus: "Pending" },
]

// ============== PHARMACY ==============
export type Medicine = {
  id: string
  name: string
  category: string
  stock: number
  expiryDate: string
  supplier: string
  price: number
}

export const medicines: Medicine[] = [
  { id: "M-001", name: "Amoxicillin 500mg", category: "Antibiotic", stock: 450, expiryDate: "2027-06-15", supplier: "PharmaCorp", price: 12.50 },
  { id: "M-002", name: "Metformin 850mg", category: "Antidiabetic", stock: 320, expiryDate: "2027-03-20", supplier: "MediSupply", price: 8.75 },
  { id: "M-003", name: "Lisinopril 10mg", category: "Antihypertensive", stock: 15, expiryDate: "2026-12-01", supplier: "PharmaCorp", price: 15.00 },
  { id: "M-004", name: "Ibuprofen 400mg", category: "Anti-inflammatory", stock: 680, expiryDate: "2027-09-10", supplier: "GlobalMeds", price: 6.25 },
  { id: "M-005", name: "Salbutamol Inhaler", category: "Bronchodilator", stock: 8, expiryDate: "2026-08-25", supplier: "MediSupply", price: 22.00 },
  { id: "M-006", name: "Omeprazole 20mg", category: "Proton Pump Inhibitor", stock: 210, expiryDate: "2027-01-30", supplier: "GlobalMeds", price: 9.50 },
  { id: "M-007", name: "Cetirizine 10mg", category: "Antihistamine", stock: 3, expiryDate: "2026-11-15", supplier: "PharmaCorp", price: 5.00 },
  { id: "M-008", name: "Atorvastatin 20mg", category: "Statin", stock: 175, expiryDate: "2027-04-22", supplier: "MediSupply", price: 18.50 },
]

// ============== LABORATORY ==============
export type LabTest = {
  id: string
  patient: string
  testName: string
  orderedBy: string
  date: string
  status: "Pending" | "In Progress" | "Completed"
  result?: string
}

export const labTests: LabTest[] = [
  { id: "L-4001", patient: "James Wilson", testName: "Complete Blood Count", orderedBy: "Dr. Sarah Chen", date: "2026-02-08", status: "Completed", result: "Normal ranges" },
  { id: "L-4002", patient: "Emily Davis", testName: "Chest X-Ray", orderedBy: "Dr. Michael Brown", date: "2026-02-09", status: "In Progress" },
  { id: "L-4003", patient: "Michael Thompson", testName: "Lipid Panel", orderedBy: "Dr. Sarah Chen", date: "2026-02-09", status: "Pending" },
  { id: "L-4004", patient: "Robert Martinez", testName: "HbA1c Test", orderedBy: "Dr. Sarah Chen", date: "2026-02-07", status: "Completed", result: "6.8% - Controlled" },
  { id: "L-4005", patient: "David Brown", testName: "Bone Density Scan", orderedBy: "Dr. James Lee", date: "2026-02-09", status: "Pending" },
  { id: "L-4006", patient: "Jennifer White", testName: "Pulmonary Function Test", orderedBy: "Dr. Michael Brown", date: "2026-02-08", status: "Completed", result: "Mild obstruction" },
]

// ============== SURGERIES ==============
export type Surgery = {
  id: string
  patient: string
  surgeon: string
  type: string
  date: string
  time: string
  room: string
}

export const upcomingSurgeries: Surgery[] = [
  { id: "S-001", patient: "David Brown", surgeon: "Dr. James Lee", type: "Femur Fixation", date: "2026-02-10", time: "08:00 AM", room: "OR-1" },
  { id: "S-002", patient: "James Wilson", surgeon: "Dr. Sarah Chen", type: "Cardiac Catheterization", date: "2026-02-11", time: "10:00 AM", room: "OR-3" },
  { id: "S-003", patient: "Michael Thompson", surgeon: "Dr. Robert Kim", type: "Hernia Repair", date: "2026-02-12", time: "09:00 AM", room: "OR-2" },
]

// ============== BED OCCUPANCY ==============
export const bedOccupancy = {
  total: 120,
  occupied: 87,
  available: 33,
  wards: [
    { name: "General Ward", total: 40, occupied: 32 },
    { name: "ICU", total: 15, occupied: 12 },
    { name: "Pediatrics", total: 20, occupied: 14 },
    { name: "Maternity", total: 15, occupied: 10 },
    { name: "Surgery", total: 30, occupied: 19 },
  ],
}

// ============== CHART DATA ==============
export const monthlyAdmissions = [
  { month: "Aug", admissions: 65 },
  { month: "Sep", admissions: 78 },
  { month: "Oct", admissions: 82 },
  { month: "Nov", admissions: 71 },
  { month: "Dec", admissions: 90 },
  { month: "Jan", admissions: 95 },
  { month: "Feb", admissions: 42 },
]

export const revenueData = [
  { month: "Aug", revenue: 145000 },
  { month: "Sep", revenue: 162000 },
  { month: "Oct", revenue: 178000 },
  { month: "Nov", revenue: 155000 },
  { month: "Dec", revenue: 198000 },
  { month: "Jan", revenue: 210000 },
  { month: "Feb", revenue: 85000 },
]

export const patientGrowth = [
  { month: "Aug", newPatients: 42, returning: 23 },
  { month: "Sep", newPatients: 55, returning: 23 },
  { month: "Oct", newPatients: 48, returning: 34 },
  { month: "Nov", newPatients: 38, returning: 33 },
  { month: "Dec", newPatients: 62, returning: 28 },
  { month: "Jan", newPatients: 58, returning: 37 },
  { month: "Feb", newPatients: 25, returning: 17 },
]

export const appointmentAnalytics = [
  { month: "Aug", scheduled: 180, completed: 162, cancelled: 18 },
  { month: "Sep", scheduled: 210, completed: 189, cancelled: 21 },
  { month: "Oct", scheduled: 195, completed: 170, cancelled: 25 },
  { month: "Nov", scheduled: 188, completed: 169, cancelled: 19 },
  { month: "Dec", scheduled: 220, completed: 198, cancelled: 22 },
  { month: "Jan", scheduled: 235, completed: 215, cancelled: 20 },
  { month: "Feb", scheduled: 105, completed: 88, cancelled: 17 },
]

// ============== MEDICAL HISTORY ==============
export type MedicalRecord = {
  date: string
  diagnosis: string
  treatment: string
  doctor: string
}

export const medicalHistory: Record<string, MedicalRecord[]> = {
  "P-1001": [
    { date: "2025-08-10", diagnosis: "Mild Angina", treatment: "Nitroglycerin prescribed", doctor: "Dr. Sarah Chen" },
    { date: "2025-11-22", diagnosis: "Elevated Blood Pressure", treatment: "Lifestyle changes & monitoring", doctor: "Dr. Sarah Chen" },
    { date: "2026-01-15", diagnosis: "Cardiac Arrhythmia", treatment: "Admitted for observation, beta-blockers", doctor: "Dr. Sarah Chen" },
  ],
  "P-1002": [
    { date: "2025-09-05", diagnosis: "Bronchitis", treatment: "Antibiotics prescribed", doctor: "Dr. Michael Brown" },
    { date: "2026-01-28", diagnosis: "Pneumonia", treatment: "Hospitalized, IV antibiotics", doctor: "Dr. Michael Brown" },
  ],
}

export const prescriptions = [
  { id: "RX-001", patientId: "P-1001", medication: "Metoprolol 50mg", dosage: "1 tablet twice daily", startDate: "2026-01-15", endDate: "2026-03-15", doctor: "Dr. Sarah Chen" },
  { id: "RX-002", patientId: "P-1001", medication: "Aspirin 75mg", dosage: "1 tablet daily", startDate: "2026-01-15", endDate: "2026-07-15", doctor: "Dr. Sarah Chen" },
  { id: "RX-003", patientId: "P-1002", medication: "Amoxicillin 500mg", dosage: "1 capsule three times daily", startDate: "2026-01-28", endDate: "2026-02-11", doctor: "Dr. Michael Brown" },
]
