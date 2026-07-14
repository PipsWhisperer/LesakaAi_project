# Lesaka AI System - Activity Diagram

## Activity 1: Telemetry Processing Flow

```
[Start]
   │
   v
[Receive Telemetry Data]
   │
   v
[Validate Data Format]
   │
   ├─Invalid──> [Log Error] ──> [Return Error]
   │
   v
[Check Temperature Range]
   │
   ├─< 30.0°C──> [Log Invalid Temp] ──> [Return Error]
   ├─> 45.0°C──> [Log Invalid Temp] ──> [Return Error]
   │
   v
[Validate District]
   │
   ├─Invalid──> [Log Invalid District] ──> [Return Error]
   │
   v
[Calculate Quality Score]
   │
   v
[Store in Database]
   │
   v
[Route to Orchestrator]
   │
   v
[Determine Agent Route]
   │
   ├─Temp > 39.5°C──> [Route to Molemo]
   │                      │
   │                      v
   │                  [Detect Fever]
   │                      │
   │                      v
   │                  [Generate Alert]
   │                      │
   │                      v
   │                  [Notify Farmer]
   │
   ├─Temp < 36.0°C──> [Route to Loapi]
   │                      │
   │                      v
   │                  [Detect Cold Stress]
   │                      │
   │                      v
   │                  [Generate Alert]
   │                      │
   │                      v
   │                  [Notify Farmer]
   │
   └─Normal Range──> [Route to Thekiso]
                           │
                           v
                       [Assess Market]
                           │
                           v
                       [Assign Grade]
                           │
                           v
                       [Update Record]
   │
   v
[End]
```

## Activity 2: Error Recovery Flow

```
[Start]
   │
   v
[Error Detected]
   │
   v
[Identify Error Type]
   │
   ├─No Data Found──> [Request Data Refresh]
   │                      │
   │                      v
   │                  [Wait for Response]
   │                      │
   │                      ├─Success──> [Resume Processing]
   │                      │
   │                      └─Timeout──> [Escalate to Manual]
   │
   ├─Context Anomaly──> [Validate Context]
   │                      │
   │                      v
   │                  [Re-validate Regional ID]
   │                      │
   │                      ├─Valid──> [Resume Processing]
   │                      │
   │                      └─Invalid──> [Escalate to Manual]
   │
   ├─Processing Error──> [Retry in Safe Mode]
   │                      │
   │                      v
   │                  [Execute Safe Processing]
   │                      │
   │                      ├─Success──> [Resume Normal Mode]
   │                      │
   │                      └─Failure──> [Escalate to Manual]
   │
   └─Unknown Error──> [Log Unknown Error]
                           │
                           v
                       [Escalate to Manual]
   │
   v
[Log Recovery Action]
   │
   v
[End]
```

## Activity 3: User Registration Flow

```
[Start]
   │
   v
[User Enters Registration Data]
   │
   v
[Validate Full Name]
   │
   ├─Invalid──> [Show Error] ──> [Return to Input]
   │
   v
[Validate District]
   │
   ├─Invalid──> [Show Error] ──> [Return to Input]
   │
   v
[Generate Owner ID]
   │
   v
[Check ID Uniqueness]
   │
   ├─Duplicate──> [Regenerate ID]
   │                  │
   │                  v
   │              [Check Uniqueness]
   │
   v
[Store Farmer Record]
   │
   v
[Assign Default Role]
   │
   v
[Send Confirmation]
   │
   v
[End]
```

## Activity 4: RBAC Access Check Flow

```
[Start]
   │
   v
[User Requests Resource]
   │
   v
[Authenticate User]
   │
   ├─Failed──> [Log Failed Attempt] ──> [Return Access Denied]
   │
   v
[Retrieve User Role]
   │
   v
[Check Permission Matrix]
   │
   ├─Permission Not Found──> [Log Permission Error] ──> [Return Access Denied]
   │
   v
[Verify Permission Granted]
   │
   ├─Denied──> [Log Access Denied] ──> [Return Access Denied]
   │
   v
[Log Access Granted]
   │
   v
[Grant Resource Access]
   │
   v
[End]
```

## Activity 5: Data Quality Assessment Flow

```
[Start]
   │
   v
[Receive Telemetry Data]
   │
   v
[Calculate Completeness]
   │
   ├─Required Fields Missing──> [Flag Incomplete]
   │
   v
[Calculate Validity]
   │
   ├─Validation Failed──> [Flag Invalid]
   │
   v
[Calculate Consistency]
   │
   ├─Inconsistent──> [Flag Inconsistent]
   │
   v
[Compute Quality Score]
   │
   v
[Score >= 0.8?]
   │
   ├─Yes──> [Accept Data]
   │
   └─No───> [Reject Data]
            │
            v
        [Notify Data Quality Issue]
   │
   v
[End]
```

## Activity 6: Market Assessment Flow

```
[Start]
   │
   v
[Receive Cattle Health Data]
   │
   v
[Check Temperature Range]
   │
   ├─Outside Optimal──> [Assign Grade C]
   │                      │
   │                      v
   │                  [Flag Health Assessment Needed]
   │
   v
[Check Heart Rate Range]
   │
   ├─Outside Optimal──> [Assign Grade B]
   │
   v
[Both Optimal?]
   │
   ├─Yes──> [Assign Grade A]
   │
   └─No───> [Assign Grade B]
   │
   v
[Calculate Estimated Value]
   │
   v
[Generate Market Report]
   │
   v
[Update Cattle Record]
   │
   v
[End]
```

## Activity 7: System Startup Flow

```
[Start]
   │
   v
[Initialize Database Connection]
   │
   ├─Failed──> [Log Database Error] ──> [Enter Safe Mode]
   │
   v
[Load Configuration]
   │
   ├─Failed──> [Use Default Config]
   │
   v
[Initialize Validation Engine]
   │
   ├─Failed──> [Log Validation Error] ──> [Enter Safe Mode]
   │
   v
[Initialize RBAC Engine]
   │
   ├─Failed──> [Log RBAC Error] ──> [Enter Safe Mode]
   │
   v
[Initialize Orchestrator]
   │
   ├─Failed──> [Log Orchestrator Error] ──> [Enter Safe Mode]
   │
   v
[Initialize Agents]
   │
   ├─Failed──> [Log Agent Error] ──> [Enter Safe Mode]
   │
   v
[Start Telemetry Listener]
   │
   ├─Failed──> [Log Listener Error] ──> [Enter Safe Mode]
   │
   v
[System Ready]
   │
   v
[End]
```

## Swimlane Diagram: Complete Telemetry Processing

```
┌─────────────┬─────────────┬──────────────┬─────────────┬─────────────┐
│   Sensor    │  Validation │ Orchestrator │    Agent    │   Database  │
├─────────────┼─────────────┼──────────────┼─────────────┼─────────────┤
│ Send Data   │             │              │             │             │
├─────────────┤ Validate    │              │             │             │
│             │ Format      │              │             │             │
├─────────────┤ Validate    │              │             │             │
│             │ Temp        │              │             │             │
├─────────────┤ Validate    │              │             │             │
│             │ District    │              │             │             │
├─────────────┤ Calc Score  │              │             │             │
├─────────────┤ Store Data  │              │             │ Receive     │
├─────────────┤             │ Route        │             │             │
│             │             │ Determine    │             │             │
├─────────────┤             │ Route to     │             │             │
│             │             │ Agent        │             │             │
├─────────────┤             │              │ Process     │             │
│             │             │              │ Analyze     │             │
├─────────────┤             │              │ Generate    │             │
│             │             │              │ Response    │             │
├─────────────┤             │ Receive      │             │             │
│             │             │ Response     │             │             │
├─────────────┤             │ Notify       │             │             │
│             │             │ User         │             │             │
└─────────────┴─────────────┴──────────────┴─────────────┴─────────────┘
```
