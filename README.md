# Lesaka AI: Autonomous Telemetry & Governance Framework

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

**A decentralized telemetry ingestion and reasoning framework for Botswana's agricultural sector**

[Documentation](#documentation) • [Installation](#installation) • [Usage](#usage) • [Architecture](#architecture) • [Contributing](#contributing)

</div>

## 📋 Overview

Lesaka AI is a dual-track Final Year Project integrating **INFS 401/402 (Information Systems and Data Management)** and **COMP 401/402 (Computer Science)** to deliver a robust livestock management solution for rural, network-constrained environments in Botswana (e.g., Orapa, Serowe, Maun, Ghanzi).

### Key Features

- **3NF Database Validation**: Ensures data integrity through Third Normal Form relational storage
- **Multi-Agent Orchestration**: Autonomous diagnostic routing through specialized agents (Molemo, Loapi, Thekiso)
- **Privacy-by-Design**: Anonymized farmer profiles using cryptographic owner tokens
- **Self-Healing Architecture**: Resilient system with automatic fallback states
- **Role-Based Access Control**: Fine-grained permissions for different user roles
- **Real-time Telemetry**: Live sensor data processing with anomaly detection

## 🏗️ System Architecture

The framework is bifurcated into two specialized logic layers:

### INFS Track (Data Governance & Storage)
- 3rd Normal Form (3NF) relational database engine (SQLite)
- Strict structural integrity constraints for data fidelity
- Regional payload validation (Botswana districts)
- RBAC implementation with privacy controls

### COMP Track (Agent Orchestration)
- Multi-Agent Graph Orchestrator with DCG routing
- Asynchronous state transitions for resilience
- Self-healing fallback mechanisms
- Thread-safe concurrent processing

## 🛠️ Technical Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Backend | Python 3.10+ | Core application logic |
| Web Framework | Flask 3.0.0 | REST API and web server |
| Database | SQLite | Edge-gateway persistence |
| Frontend | React 18+ | Modern web UI (Figma export) |
| Build Tool | Vite | Fast frontend development |
| Styling | Tailwind CSS | Utility-first CSS framework |
| UI Components | Radix UI | Accessible component library |

## 📦 Installation

### Prerequisites
- Python 3.10 or higher
- pip (Python package manager)
- Node.js 18+ (for React frontend)
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/PipsWhisperer/LesakaAi_project.git
cd LesakaAi_project

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python init_db.py
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Or run development server
npm run dev
```

## 🚀 Usage

### Running the Application

```bash
# Start Flask web server
python app.py

# Access the application at http://localhost:5000
```

### Running Core Modules

```bash
# Initialize and validate the INFS storage engine
python lesaka_validation_engine.py

# Route telemetry through the COMP Agent Orchestrator
python graph_orchestrator.py
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main dashboard |
| `/api/register_farmer` | POST | Register new farmer |
| `/api/ingest_telemetry` | POST | Ingest sensor data |
| `/api/cattle_list/<owner_id>` | GET | Get farmer's cattle |
| `/api/telemetry_history/<cattle_id>` | GET | Get cattle telemetry |

## 📊 Architecture Diagrams

### System Overview
```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│              (Dashboard, Cattle List, Billing)          │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST API
┌────────────────────┴────────────────────────────────────┐
│                   Flask Web Server                       │
│              (Authentication, Routing, RBAC)             │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────┴────────┐      ┌────────┴────────┐
│  INFS Engine   │      │ COMP Orchestrator│
│  (Validation)  │      │  (Multi-Agent)  │
└───────┬────────┘      └────────┬────────┘
        │                         │
        └────────────┬────────────┘
                     │
            ┌────────┴────────┐
            │  SQLite Database │
            │  (3NF Schema)    │
            └──────────────────┘
```

## 📁 Project Structure

```
LesakaAi_project/
├── app.py                      # Flask web application
├── lesaka_validation_engine.py  # INFS: 3NF validation engine
├── graph_orchestrator.py       # COMP: Multi-agent orchestrator
├── init_db.py                  # Database initialization
├── requirements.txt            # Python dependencies
├── frontend/                   # React application
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── templates/                  # HTML templates
├── Dissertation/               # LaTeX dissertation
├── Research/                  # Literature review materials
├── Meeting_Notes/             # Supervisor meeting records
├── Weekly_Progress/           # Weekly progress tracking
├── Testing_Evidence/          # Testing documentation
├── UML/                       # UML diagrams
├── Poster/                    # Academic poster
├── Presentation/             # Presentation materials
└── Viva_Preparation/          # Viva preparation
```

## 🧪 Testing

```bash
# Run validation engine tests
python lesaka_validation_engine.py

# Run graph orchestrator tests
python graph_orchestrator.py

# Run web application
python app.py
```

## 📖 Documentation

- [Software Requirements Specification](Documentation/SRS.md)
- [Software Design Specification](Documentation/SDS.md)
- [API Documentation](Documentation/API_Documentation.md)
- [Database Documentation](Documentation/Database_Documentation.md)
- [Installation Guide](Documentation/Installation_Guide.md)
- [User Manual](Documentation/User_Manual.md)
- [FYP Structure](FYP_STRUCTURE.md)
- [Semester 2 Plan](SEMESTER_2_PLAN.md)

## 🎓 Academic Context

This repository serves as the technical delivery for the **BIUST Final Year Project** submission. It demonstrates the intersection of:

- **Enterprise Data Governance** (INFS 401/402 - Information Systems and Data Management)
- **Intelligent Agent Systems** (COMP 401/402 - Computer Science)
- **Privacy-by-Design Principles**
- **Resilient Edge Computing**

### Assessment Alignment

| Module | Focus | Implementation |
|--------|-------|----------------|
| INFS 401 | 3NF Validation & Database Design | `lesaka_validation_engine.py`, Database schema |
| INFS 402 | RBAC, Privacy & Advanced Data Governance | Role-based access control, audit logging, encryption |
| COMP 401 | Agent Orchestration & Graph Algorithms | `graph_orchestrator.py`, routing algorithms |
| COMP 402 | Async Processing & Self-Healing | Exception handling, fallback states, thread safety |

## 🤝 Contributing

This is an academic project. For questions or suggestions, please open an issue or contact the maintainer.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Andries Mooketsi Moiteelasilo**
- Botswana International University of Science and Technology (BIUST)
- Final Year Project 2026
- Computer Science & Information Systems

## 🙏 Acknowledgements

- BIUST Department of Computer Science
- Project Supervisor
- Botswana Agricultural Community (Orapa, Serowe, Maun, Ghanzi)

## 📞 Contact

- GitHub: [@PipsWhisperer](https://github.com/PipsWhisperer)
- Email: mamoiteelasilo@caab.co.bw

---

<div align="center">

**Built with ❤️ for Botswana's Agricultural Sector**

[⬆ Back to Top](#lesaka-ai-autonomous-telemetry--governance-framework)

</div>
