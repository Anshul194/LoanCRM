import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import Enquiry from './pages/Enquiry.jsx'
import Campaigns from './pages/Campaigns.jsx'
import CreateLead from './pages/CreateLead.jsx'
import Accounts from './pages/Accounts.jsx'
import Invoices from './pages/Invoices.jsx'
import PayoutRequests from './pages/PayoutRequests.jsx'
import Masters from './pages/Masters.jsx'
import LeadStatus from './pages/LeadStatus.jsx'
import Automation from './pages/Automation.jsx'
import AutomationMapping from './pages/AutomationMapping.jsx'
import Reports from './pages/Reports.jsx'
import LenderMaster from './pages/LenderMaster.jsx'
import EmployeeIncentiveStructure from './pages/EmployeeIncentiveStructure.jsx'
import ConnectorsPayoutStructure from './pages/ConnectorsPayoutStructure.jsx'
import CustomField from './pages/CustomField.jsx'
import LeadSource from './pages/LeadSource.jsx'
import Tasks from './pages/Tasks.jsx'
import TaskDetails from './pages/TaskDetails.jsx'
import Products from './pages/Products.jsx'
import Employees from './pages/Employees.jsx'
import CreateEmployee from './pages/CreateEmployee.jsx'
import Roles from './pages/Roles.jsx'
import EmployeeTarget from './pages/EmployeeTarget.jsx'
import DocumentMaster from './pages/DocumentMaster.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import CreateEnquiry from './pages/CreateEnquiry.jsx'
import Dispositions from './pages/Dispositions.jsx'
import BulkUpload from './pages/BulkUpload.jsx'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/enquiry" element={<Enquiry/>} />
        <Route path="/campaigns" element={<Campaigns/>} />
        <Route path="/create-lead" element={<CreateLead />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/payout-requests" element={<PayoutRequests />} />
        <Route path="/masters" element={<Masters />} />
        <Route path="/masters/lead-status" element={<LeadStatus />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/automation-mapping" element={<AutomationMapping />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/masters/lender-master" element={<LenderMaster />} />
        <Route path="/masters/employee-incentive-structure" element={<EmployeeIncentiveStructure />} />
        <Route path="/masters/connectors-payout-structure" element={<ConnectorsPayoutStructure />} />
        <Route path="/masters/custom-field" element={<CustomField />} />
        <Route path="/masters/lead-source" element={<LeadSource />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/masters/products" element={<Products />} />
        <Route path="/masters/employees" element={<Employees />} />
        <Route path="/masters/create-employee" element={<CreateEmployee />} />
        <Route path="/masters/roles" element={<Roles />} />
        <Route path="/masters/create-role" element={<div className="p-8">Create Role Page</div>} />
        <Route path="/masters/employee-target" element={<EmployeeTarget />} />
        <Route path="/masters/document-master" element={<DocumentMaster />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-enquiry" element={<CreateEnquiry />} />
        <Route path="/dispositions" element={<Dispositions />} />
        <Route path="/bulk-upload" element={<BulkUpload />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
