# Enterprise Identity & Access Governance Platform

A production-grade Identity and Access Management (IAM) system built with ServiceNow SDK, React, TypeScript, and TailwindCSS.

## 🎯 Project Overview

This is a comprehensive enterprise access management platform that provides:

- **Access Request Management** - Submit, track, and manage access requests
- **Approval Workflows** - Multi-level approval processes with escalation
- **User Provisioning** - Automated and manual access provisioning
- **Access Reviews** - Periodic certification and recertification
- **Compliance & Audit** - Complete audit trail for regulatory compliance
- **Role Management** - Enterprise role-based access control
- **Reporting & Analytics** - Comprehensive dashboards and reports

## 🏗️ Architecture

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Vite** - Fast build tool and dev server

### Backend (ServiceNow)
- **ServiceNow SDK** - Scoped application development
- **Fluent API** - Modern ServiceNow development approach
- **Script Includes** - Business logic services
- **Business Rules** - Automated workflows
- **REST APIs** - External integrations
- **ACLs** - Security and access control

## 📁 Project Structure

\`\`\`
it-access-management-servicenow/
├── src/
│   ├── client/              # React frontend
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service classes
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── layouts/         # Layout components
│   │   └── context/         # React context providers
│   │
│   └── fluent/              # ServiceNow backend
│       ├── tables/          # Table definitions
│       ├── business-rules/  # Business rule scripts
│       ├── script-includes/ # Service classes
│       ├── rest-api/        # REST API endpoints
│       ├── client-scripts/  # Client-side scripts
│       ├── ui-actions/      # UI actions
│       ├── flows/           # Flow Designer flows
│       ├── notifications/   # Email notifications
│       ├── scheduled-jobs/  # Scheduled scripts
│       └── acls/            # Access control lists
│
├── docs/                    # Documentation
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- ServiceNow Personal Developer Instance (PDI) or Enterprise instance

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/mahendrashongunti/it-access-managment-service-now.git
   cd it-access-managment-service-now
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your ServiceNow instance details
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Build for production**
   \`\`\`bash
   npm run build
   \`\`\`

## 📚 Key Features

### 1. Access Request Management
- Create access requests for users
- Support for bulk requests
- Emergency access requests
- Delegated requests (on behalf of others)
- Draft, submit, and track requests

### 2. Approval Workflows
- Multi-level approval chains
- Parallel and sequential approvals
- Manager approval
- Resource owner approval
- Security/compliance approval
- Approval delegation
- Escalation rules

### 3. User Provisioning
- Automated provisioning for low-risk access
- Manual fulfillment for high-risk access
- Integration hooks for external systems
- Expiration management
- Access extension requests
- Revocation workflows

### 4. Access Reviews
- Quarterly/Annual certification campaigns
- Manager reviews
- Application owner reviews
- Risk-based review prioritization
- Bulk decision capabilities
- Review delegation

### 5. Audit & Compliance
- Complete audit trail
- Compliance reports (SOX, ISO 27001)
- Who/What/When tracking
- Change history
- Access analytics

### 6. Reporting & Analytics
- Executive dashboard
- Request metrics
- Approval time analytics
- Access distribution reports
- Risk assessment reports
- Review completion tracking

## 🔧 Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
\`\`\`

### Code Style

This project follows strict TypeScript and React best practices:

- **TypeScript Strict Mode** - Full type safety
- **Functional Components** - No class components
- **React Hooks** - Modern React patterns
- **Service Layer** - No API calls in components
- **Composition** - Reusable, composable components
- **ESLint** - Code quality enforcement
- **Prettier** - Consistent code formatting

## 🔐 Security

### Authentication
- ServiceNow SSO integration
- OAuth 2.0 support
- Session management

### Authorization
- Role-based access control (RBAC)
- Field-level security
- Row-level security with ACLs
- API security

### Data Protection
- Encryption at rest
- Encryption in transit
- Audit logging
- Data masking for sensitive fields

## 📖 Documentation

Comprehensive documentation is available in the \`docs/\` directory:

- [ServiceNow Fundamentals](docs/00-servicenow-fundamentals.md)
- [Project Setup](docs/01-project-setup.md)
- [Data Modeling](docs/02-data-modeling.md)
- [Security Model](docs/03-security-model.md)
- [Access Catalog](docs/04-access-catalog.md)
- [Request Management](docs/05-request-management.md)
- [Business Rules](docs/06-business-rules.md)
- [Approval Engine](docs/07-approval-engine.md)
- [Script Includes](docs/08-script-includes.md)
- [REST API](docs/09-rest-api.md)
- [React Frontend](docs/10-react-frontend.md)
- [Flow Designer](docs/11-flow-designer.md)
- [Notifications](docs/12-notifications.md)
- [Scheduled Jobs](docs/13-scheduled-jobs.md)
- [Audit & Compliance](docs/14-audit-compliance.md)
- [Testing](docs/15-testing.md)
- [Deployment](docs/16-deployment.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mahendra Shongunti** - Initial work

## 🙏 Acknowledgments

- ServiceNow Developer Community
- React and TypeScript communities
- TailwindCSS and DaisyUI teams

## 📞 Support

For support, email [support@example.com] or open an issue in the GitHub repository.

## 🗺️ Roadmap

See [plan.md](plan.md) for the complete project roadmap and phase breakdown.

### Current Phase: Phase 1 - Project Setup ✅
### Next Phase: Phase 2 - Core Data Model

## 🔄 Version History

- **0.1.0** - Initial project setup with React, TypeScript, and ServiceNow structure

---

**Built with ❤️ for enterprise access governance**
