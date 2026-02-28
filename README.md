# 🏆 AI-Powered Patient Query & Smart Appointment Interface
### Intelligent Digital Triage & Secure Healthcare Booking System

---

## 🚨 Problem Statement

Traditional healthcare booking systems are reactive and unstructured.

- Patients describe symptoms vaguely  
- Incorrect specialist bookings are common  
- Emergency symptoms go unnoticed  
- No triage intelligence at the entry point  

There is a need for a structured, intelligent, and secure patient-facing healthcare interface.

---

## 💡 Our Solution

We developed a **Smart Digital Triage & Appointment Intelligence Platform** that:

- Collects structured symptom inputs  
- Performs AI-based risk scoring  
- Detects emergency conditions in real-time  
- Recommends the correct specialist automatically  
- Secures patient data using encryption  

This transforms appointment booking into a proactive healthcare gateway.

---

## ✨ Key Features

### 📝 Structured Patient Input
- Multi-step form interface  
- Symptom multi-select chips  
- Severity scale (1–5)  
- Duration tracking  
- Real-time validation  

### 🧠 AI Symptom Intelligence Engine
- Risk scoring (Low / Medium / High)  
- Condition category mapping  
- Specialist auto-recommendation  
- Live urgency feedback  

### 🚨 Emergency Escalation Logic
- Detects critical symptom combinations  
- Displays emergency alert banner  
- Suggests nearest hospital  
- Disables booking for high-risk cases  

### 📅 Smart Appointment Booking
- Auto-suggested specialization  
- Date & time slot selection  
- Teleconsultation option  
- Encrypted appointment reference ID  

### 🔐 Security Layer
- AES-based data encryption  
- JWT authentication  
- Tokenized confirmation links  
- Backend validation & sanitization  

### ♿ Accessibility
- Dark mode toggle  
- Large text mode  
- Voice-to-text symptom entry  
- Mobile-responsive UI  

---

## 🏗️ Project Structure

```text
patient-query-appointment-interface/
├── frontend/                    # React + Tailwind frontend
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── assets/             # images, icons, etc.
│   │   │
│   │   ├── components/         # reusable UI pieces
│   │   │   ├── Stepper.jsx
│   │   │   ├── SymptomSelector.jsx
│   │   │   ├── RiskMeter.jsx
│   │   │   ├── EmergencyAlert.jsx
│   │   │   └── AppointmentCard.jsx
│   │   │
│   │   ├── pages/              # route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── PatientForm.jsx
│   │   │   ├── Booking.jsx
│   │   │   └── Confirmation.jsx
│   │   │
│   │   ├── services/           # API calls & utilities
│   │   │   ├── api.js
│   │   │   ├── encryption.js
│   │   │   └── riskService.js
│   │   │
│   │   ├── context/
│   │   │   └── PatientContext.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── validators.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
```
---

## 🔄 System Flow

1️⃣ **Patient Input Phase**
- User enters personal details  
- Selects symptoms, severity, and duration  

⬇  

2️⃣ **AI Triage Engine**
- Maps symptoms to condition clusters  
- Calculates risk score  
- Categorizes urgency level  

⬇  

3️⃣ **Emergency Detection**
- If high-risk pattern detected → Show emergency alert  
- Suggest nearest hospital  
- Disable booking  

⬇  

4️⃣ **Specialist Recommendation**
- Auto-suggest department  
- Display available time slots  

⬇  

5️⃣ **Secure Appointment Confirmation**
- Encrypt data  
- Generate reference ID  
- Send secure confirmation  

---

## 🏛️ System Architecture

Frontend (React + Tailwind CSS)  
⬇  
FastAPI Backend  
⬇  
AI Triage & Emergency Logic  
⬇  
MongoDB Database  
⬇  
Security Layer (AES Encryption + JWT Authentication)  

Designed with modular and scalable architecture.

---

