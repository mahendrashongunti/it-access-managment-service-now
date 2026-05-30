# Project Setup Guide

## Overview

This document guides you through setting up the Enterprise Identity & Access Governance Platform development environment.

## Prerequisites

### Required Software
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: 2.x or higher
- **VS Code** (recommended) or your preferred IDE
- **ServiceNow Personal Developer Instance** (PDI)

### Recommended VS Code Extensions
- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense
- ServiceNow Extension for VS Code

## Initial Setup

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/mahendrashongunti/it-access-managment-service-now.git
cd it-access-managment-service-now
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

This will install:
- React 18.3.1
- React Router DOM 6.23.1
- TypeScript 5.4.5
- Vite 5.2.11
- TailwindCSS 3.4.3
- DaisyUI 4.11.1
- ESLint 8.57.0
- Prettier 3.2.5

### 3. Environment Configuration

Create a \`.env\` file in the root directory:

\`\`\`env
# ServiceNow Instance
VITE_SERVICENOW_INSTANCE=https://your-instance.service-now.com
VITE_API_BASE_URL=/api/itam/v1

# Development
VITE_DEV_MODE=true
VITE_LOG_LEVEL=debug
\`\`\`

### 4. Verify Installation

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

The application should start at http://localhost:3000

## Project Structure Explained

\`\`\`
src/
├── client/                  # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Card.tsx
│   │   └── Common.tsx
│   ├── pages/              # Page components (routes)
│   │   ├── Dashboard.tsx
│   │   ├── MyRequests.tsx
│   │   ├── PendingApprovals.tsx
│   │   ├── MyAccess.tsx
│   │   ├── AccessCatalog.tsx
│   │   ├── AccessReviews.tsx
│   │   ├── Reports.tsx
│   │   ├── AuditLogs.tsx
│   │   ├── AdminConsole.tsx
│   │   └── Settings.tsx
│   ├── services/           # API service classes
│   │   ├── ApiClient.ts
│   │   ├── DashboardService.ts
│   │   ├── AccessRequestService.ts
│   │   ├── ApprovalService.ts
│   │   ├── AssignmentService.ts
│   │   ├── CatalogService.ts
│   │   ├── ReviewService.ts
│   │   └── AuditService.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── layouts/            # Layout components
│   │   └── MainLayout.tsx
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   └── utils/              # Utility functions
│
└── fluent/                 # ServiceNow backend
    ├── tables/             # Table definitions
    │   ├── Department.ts
    │   ├── Application.ts
    │   ├── AccessType.ts
    │   ├── AccessRequest.ts
    │   ├── Approval.ts
    │   ├── Assignment.ts
    │   └── AuditLog.ts
    ├── script-includes/    # Business logic services
    │   └── AccessRequestService.ts
    ├── business-rules/     # Automated workflows
    │   └── RequestStateChanged.ts
    ├── rest-api/           # REST API endpoints
    │   └── AccessRequestAPI.ts
    ├── client-scripts/     # Client-side validation
    ├── ui-actions/         # Custom buttons/links
    ├── flows/              # Flow Designer workflows
    ├── notifications/      # Email templates
    ├── scheduled-jobs/     # Scheduled tasks
    └── acls/               # Access control lists
\`\`\`

## Development Workflow

### 1. Frontend Development

Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Features:
- Hot Module Replacement (HMR)
- Fast refresh
- TypeScript type checking
- ESLint integration

### 2. Code Quality

Run linting:
\`\`\`bash
npm run lint
npm run lint:fix
\`\`\`

Run formatting:
\`\`\`bash
npm run format
npm run format:check
\`\`\`

Run type checking:
\`\`\`bash
npm run type-check
\`\`\`

### 3. Building for Production

\`\`\`bash
npm run build
\`\`\`

This creates an optimized production build in the \`dist/\` directory.

Preview the production build:
\`\`\`bash
npm run preview
\`\`\`

## ServiceNow Setup

### 1. Request Personal Developer Instance

1. Go to [ServiceNow Developer Portal](https://developer.servicenow.com)
2. Sign up or log in
3. Request a Personal Developer Instance (PDI)
4. Wait for instance creation (usually a few minutes)

### 2. Access Your Instance

Your instance URL will be:
\`\`\`
https://devXXXXXX.service-now.com
\`\`\`

Login credentials will be provided in the email.

### 3. Create Scoped Application

1. Navigate to **System Applications** > **Studio**
2. Click **Create Application**
3. Fill in details:
   - **Name**: IT Access Management
   - **Scope**: x_itam
4. Click **Create**

### 4. Configure Tables

Use the table definitions from \`src/fluent/tables/\` to create tables in ServiceNow Studio.

Example for Department table:
1. In Studio, click **Create Application File**
2. Select **Table**
3. Use the definition from \`Department.ts\`

### 5. Add Script Includes

1. Create Application File > Script Include
2. Copy code from \`src/fluent/script-includes/\`
3. Make accessible from: This application scope

### 6. Configure REST APIs

1. Create Application File > Scripted REST API
2. Base path: \`/api/itam/v1\`
3. Add resources from \`src/fluent/rest-api/\`

### 7. Set Up Business Rules

1. Create Application File > Business Rule
2. Select table and conditions
3. Copy script from \`src/fluent/business-rules/\`

## Testing the Setup

### 1. Frontend Test

Navigate to http://localhost:3000 and verify:
- Dashboard loads
- Navigation works
- Pages render correctly

### 2. Backend Test

Test REST API:
\`\`\`bash
curl -X GET "https://your-instance.service-now.com/api/itam/v1/requests" \\
  -H "Accept: application/json" \\
  -u username:password
\`\`\`

### 3. Integration Test

1. Create a test request from the UI
2. Verify it appears in ServiceNow
3. Check audit logs

## Troubleshooting

### Common Issues

**Issue**: npm install fails
**Solution**: Clear npm cache and retry
\`\`\`bash
npm cache clean --force
npm install
\`\`\`

**Issue**: Port 3000 already in use
**Solution**: Use a different port
\`\`\`bash
PORT=3001 npm run dev
\`\`\`

**Issue**: ServiceNow CORS errors
**Solution**: Configure CORS in ServiceNow
1. Navigate to **System Web Services** > **REST** > **REST API**
2. Add your development URL to allowed origins

**Issue**: TypeScript errors
**Solution**: Restart VS Code TypeScript server
- Press Cmd/Ctrl + Shift + P
- Select "TypeScript: Restart TS Server"

## Next Steps

1. Review [Data Modeling](./02-data-modeling.md)
2. Understand [Security Model](./03-security-model.md)
3. Explore [Request Management](./05-request-management.md)

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [ServiceNow Developer Portal](https://developer.servicenow.com/)

---

**Setup Complete!** You're ready to start development.
