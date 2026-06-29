# Lesaka AI: Autonomous Telemetry & Governance Framework

## 1. Overview

Lesaka AI is a decentralized telemetry ingestion and reasoning framework engineered for Botswana’s agricultural sector (e.g., Orapa, Serowe). This dual-track project integrates **INFS 401 (Information Systems)** and **COMP 401 (Computer Science)** to deliver a robust solution for livestock management in rural, network-constrained environments.

## 2. System Architecture

The framework is bifurcated into two specialized logic layers:

* **INFS Track (Data Governance & Storage):** Utilizes a **3rd Normal Form (3NF)** relational database engine implemented in SQLite. It enforces strict structural integrity constraints to ensure data fidelity at the edge node level.
* **COMP Track (Agent Orchestration):** Features a **Multi-Agent Graph Orchestrator** that moves beyond fragile procedural scripts to a stateful, asynchronous logic system capable of autonomous diagnostic routing.

## 3. Key Technical Pillars

* **Structural Integrity:** Automated boundary validation (e.g., physiological temperature thresholds:30.0-45.0 Degrees Celcius to reject corrupted sensor telemetry.
* **Privacy-by-Design:** Decouples sensitive farmer profiles from telemetry assets using anonymized `owner_id` tokens.
* **Resilience:** Asynchronous graph transitions enable the system to maintain operational states despite intermittent connectivity.

## 4. Technical Implementation

* **Engine:** Python 3.x
* **Storage:** SQLite (optimized for edge-gateway persistence)
* **Dependencies:** Standard libraries only (designed for low-resource deployment)

## 5. Usage

To initialize the validation suite and run the multi-agent orchestrator:

```bash
# Initialize and validate the INFS storage engine
python lesaka_validation_engine.py

# Route telemetry through the COMP Agent Orchestrator
python graph_orchestrator.py

```

## 6. Academic Context

This repository serves as the technical delivery for the BIUST Semester I Final Year Project submission. It demonstrates the intersection of **Enterprise Data Governance** and **Intelligent Agent Systems**.

