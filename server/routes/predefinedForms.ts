import { Form, FormField } from "@shared/types";

// Predefined template forms (4 original templates + Discovery Form)
const legacyPredefinedForms: Form[] = [
  {
    id: "form-clearance-certificate",
    name: "Clearance Certificate",
    description: "Fill out Clearance Certificate - BBandP Document",
    fields: [
      {
        id: "field-cname",
        type: "text",
        label: "What's your name?",
        required: true,
        placeholder: "Client Name",
        autoFillFrom: "clientName",
      },
      {
        id: "field-cref",
        type: "text",
        label: "What's your Reference?",
        required: true,
        placeholder: "Claim Number",
        autoFillFrom: "claimNo",
      },
      {
        id: "field-caddress",
        type: "text",
        label: "What the Address?",
        required: true,
        placeholder: "Property Address",
      },
      {
        id: "field-cdamage",
        type: "text",
        label: "What the cause of damage?",
        required: true,
        placeholder: "Cause of damage",
      },
      {
        id: "field-cquality1",
        type: "select",
        label:
          "Did the service Provider make an appointment to inspect damage?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-cquality2",
        type: "select",
        label: "Did the service Provider Keep to the appointment?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-cquality3",
        type: "select",
        label: "Were the staff neat and presentable?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-cquality4",
        type: "select",
        label:
          "Did the service Provider Keep you informed on the progress of job?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-cquality5",
        type: "select",
        label: "Did the service Provider clean the site before leaving?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-cquality6",
        type: "select",
        label:
          "Please rate the standard of the workmanship and service overall?",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-gcomments",
        type: "text",
        label: "General Comments:",
        required: true,
        placeholder: "General comments",
        section: "client",
      },
      {
        id: "field-scopework",
        type: "text",
        label: "Scope of Work Comments:",
        required: true,
        placeholder: "Scope of work details",
      },
      {
        id: "field-oldgeyser",
        type: "select",
        label: "OLD GEYSER DETAILS:",
        required: true,
        options: ["None", "Other"],
      },
      {
        id: "field-oldgeyser-details",
        type: "text",
        label: "Old Geyser Details (if Other):",
        required: false,
        placeholder: "Specify old geyser details",
        dependsOn: "field-oldgeyser",
        showWhen: "Other",
      },
      {
        id: "field-newgeyser",
        type: "select",
        label: "NEW GEYSER DETAILS:",
        required: true,
        options: ["None", "Other"],
      },
      {
        id: "field-newgeyser-details",
        type: "text",
        label: "New Geyser Details (if Other):",
        required: false,
        placeholder: "Specify new geyser details",
        dependsOn: "field-newgeyser",
        showWhen: "Other",
      },
      {
        id: "field-staff",
        type: "text",
        label: "What staff operated?",
        required: true,
        autoFillFrom: "assignedStaffName",
        readonly: true,
      },
      {
        id: "field-excess",
        type: "select",
        label: "Was Excess Paid:",
        required: true,
        options: ["Yes", "No"],
      },
      {
        id: "field-amount",
        type: "number",
        label: "Excess Amount Paid:",
        required: true,
        placeholder: "0",
        autoCalculate: true,
      },
      {
        id: "field-signature-clearance",
        type: "signature",
        label: "Signature",
        required: false,
        filename: "",
      },
    ],
    isTemplate: true,
    restrictedToCompanies: [],
    createdBy: "admin-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-sahl-certificate",
    name: "SAHL Certificate Form",
    description: "Fill out this form to sign the SAHL Form",
    fields: [
      {
        id: "field-clientname",
        type: "text",
        label: "Name of Insured?",
        required: true,
        placeholder: "Client Name",
      },
      {
        id: "field-clientref",
        type: "text",
        label: "Claim Number?",
        required: true,
        placeholder: "Claim Reference",
      },
      {
        id: "field-clientaddress",
        type: "text",
        label: "Property Address?",
        required: true,
        placeholder: "Property Address",
      },
      {
        id: "field-clientdamage",
        type: "text",
        label: "What was the cause of the damage?",
        required: true,
        placeholder: "Cause of damage",
      },
      {
        id: "field-scopework-general",
        type: "textarea",
        label: "General Scope of work:",
        required: true,
        placeholder: "General scope of work details",
      },
      {
        id: "field-checkbox1",
        type: "select",
        label:
          "Did the service provider make an appointment to inspect the damage?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-checkbox2",
        type: "select",
        label: "Did the service provider keep to the appointment?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-checkbox3",
        type: "select",
        label: "Were the staff neat and presentable?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-checkbox4",
        type: "select",
        label:
          "Did the service provider keep you informed on the progress of the claim?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-checkbox5",
        type: "select",
        label: "Did the service provider clean before leaving the site?",
        required: true,
        options: ["Yes", "No"],
        section: "client",
      },
      {
        id: "field-checkbox6",
        type: "select",
        label:
          "Please rate the standard of the workmanship and service rendered by the service provider?",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox7",
        type: "select",
        label: "Has the client paid the excess?",
        required: true,
        options: ["Yes", "No"],
      },
      {
        id: "field-staffname",
        type: "text",
        label: "What staff assisted you?",
        required: true,
        autoFillFrom: "assignedStaffName",
        readonly: true,
      },
      {
        id: "field-signature-sahl",
        type: "signature",
        label: "Signature",
        required: false,
        filename: "",
      },
    ],
    isTemplate: true,
    restrictedToCompanies: [],
    createdBy: "admin-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-absa-certificate",
    name: "ABSA Form",
    description: "Fill out ABSA Form - Service Provider Evaluation",
    fields: [
      {
        id: "field-csa-ref",
        type: "text",
        label: "What is the CSA Ref?",
        required: true,
        placeholder: "Claim Number",
        autoFillFrom: "title",
      },
      {
        id: "field-full-name",
        type: "text",
        label: "What's the Full name of Insured?",
        required: true,
        placeholder: "Full Name",
      },
      {
        id: "field-claim-number",
        type: "text",
        label: "What's the Claim no?",
        required: true,
        placeholder: "Claim Number",
      },
      {
        id: "field-property-address",
        type: "text",
        label: "What the Property address?",
        required: true,
        placeholder: "Property Address",
      },
      {
        id: "field-cause-damage",
        type: "text",
        label: "Cause of damage?",
        required: true,
        placeholder: "Cause of damage",
      },
      {
        id: "field-checkbox1",
        type: "select",
        label:
          "The extent/clarity of the information communicated by the service provider prior to repairs being carried out.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox2",
        type: "select",
        label:
          "The extent to which the service provider kept you informed on the progress and status during repairs being carried out.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox3",
        type: "select",
        label:
          "Did the service provider appear knowledgeable in terms of the services needed both before and during repairs?",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox4",
        type: "select",
        label:
          "The extent to which the service provider could answer all your questions satisfactorily.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox5",
        type: "select",
        label:
          "The speed with which your queries and requests were addressed by the service provider.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox6",
        type: "select",
        label: "The punctuality of the service provider.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox7",
        type: "select",
        label:
          "Did the service provider complete the repair within the first agreed time?",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox8",
        type: "select",
        label:
          "The helpfulness, friendliness, politeness and courtesy of the service provider and his/her workers.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox9",
        type: "select",
        label: "Your overall impression of the provider and his/her workers.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox10",
        type: "select",
        label:
          "The service provider's quality of workmanship (e.g. cleanliness)?",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox11",
        type: "select",
        label:
          "The extent to which the service provider made you feel like a valued client.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox12",
        type: "select",
        label: "Your overall service experience with the service provider.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-checkbox13",
        type: "select",
        label: "The likelihood that you would recommend this service provider.",
        required: true,
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        section: "client",
      },
      {
        id: "field-staff-name-absa",
        type: "text",
        label: "What staff operated?",
        required: true,
        autoFillFrom: "assignedStaffName",
        readonly: true,
      },
      {
        id: "field-excess-paid-absa",
        type: "select",
        label: "Was Excess Paid:",
        required: true,
        options: ["Yes", "No"],
      },
      {
        id: "field-signature-absa",
        type: "signature",
        label: "Signature",
        required: false,
        filename: "",
      },
    ],
    isTemplate: true,
    restrictedToCompanies: [],
    createdBy: "admin-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-liability-certificate",
    name: "Enhanced Liability Waiver Form",
    description: "Comprehensive liability assessment with before/after comparison and auto-fill capabilities",
    fields: [
      // Auto-fill Information Section
      {
        id: "date",
        type: "date",
        label: "Date",
        required: true
      },
      {
        id: "insurance",
        type: "text",
        label: "Insurance",
        required: true,
        placeholder: "Auto-filled from job",
        autoFillFrom: "underwriter"
      },
      {
        id: "claim_number",
        type: "text",
        label: "Claim Number",
        required: true,
        placeholder: "Auto-filled from job",
        autoFillFrom: "claimNo"
      },
      {
        id: "client",
        type: "text",
        label: "Client",
        required: true,
        placeholder: "Auto-filled from job",
        autoFillFrom: "insuredName"
      },
      {
        id: "plumber",
        type: "text",
        label: "Plumber",
        required: true,
        placeholder: "Auto-filled from assignment",
        autoFillFrom: "assignedStaffName",
        readonly: true
      },

      // Main Assessment Items (8 primary assessment sections)
      {
        id: "existing_pipes_fittings",
        type: "select",
        label: "Existing Pipes / Fittings",
        required: true,
        options: ["Yes", "No", "N/A"]
      },
      {
        id: "roof_entry",
        type: "select",
        label: "Roof Entry",
        required: true,
        options: ["Yes", "No", "N/A"]
      },
      {
        id: "geyser_enclosure",
        type: "select",
        label: "Geyser Enclosure",
        required: true,
        options: ["Yes", "No", "N/A"]
      },
      {
        id: "wiring_electrical_alarm",
        type: "select",
        label: "Wiring (Electrical/Alarm)",
        required: true,
        options: ["Yes", "No", "N/A"]
      },
      {
        id: "waterproofing",
        type: "select",
        label: "Waterproofing",
        required: true,
        options: ["Yes", "No", "N/A"]
      },
      {
        id: "pipes_not_secured",
        type: "select",
        label: "Pipes Not Secured",
        required: true,
        options: ["Yes", "No", "N/A"]
      },
      {
        id: "not_listed_comments",
        type: "textarea",
        label: "Not Listed (Comments and Service Overall)",
        required: false,
        placeholder: "Describe any items not listed above"
      },
      {
        id: "increase_decrease_pressure",
        type: "select",
        label: "Increase/Decrease in Pressure",
        required: true,
        options: ["Yes", "No", "N/A"]
      },

      // Before/After Comparison Sections (7 sections)
      {
        id: "water_hammer_before",
        type: "text",
        label: "Water Hammer - Before",
        required: false,
        placeholder: "Status before work"
      },
      {
        id: "water_hammer_after",
        type: "text",
        label: "Water Hammer - After",
        required: false,
        placeholder: "Status after work"
      },
      {
        id: "pressure_test_before",
        type: "text",
        label: "Pressure Test - Before",
        required: false,
        placeholder: "Pressure reading before"
      },
      {
        id: "pressure_test_after",
        type: "text",
        label: "Pressure Test - After",
        required: false,
        placeholder: "Pressure reading after"
      },
      {
        id: "thermostat_setting_before",
        type: "text",
        label: "Thermostat Setting - Before",
        required: false,
        placeholder: "Setting before work"
      },
      {
        id: "thermostat_setting_after",
        type: "text",
        label: "Thermostat Setting - After",
        required: false,
        placeholder: "Setting after work"
      },
      {
        id: "external_isolator_before",
        type: "text",
        label: "External Isolator - Before",
        required: false,
        placeholder: "Status before work"
      },
      {
        id: "external_isolator_after",
        type: "text",
        label: "External Isolator - After",
        required: false,
        placeholder: "Status after work"
      },
      {
        id: "number_of_geysers_before",
        type: "text",
        label: "Number of Geysers - Before",
        required: false,
        placeholder: "Count before work"
      },
      {
        id: "number_of_geysers_after",
        type: "text",
        label: "Number of Geysers - After",
        required: false,
        placeholder: "Count after work"
      },
      {
        id: "balanced_system_before",
        type: "text",
        label: "Balanced System - Before",
        required: false,
        placeholder: "Status before work"
      },
      {
        id: "balanced_system_after",
        type: "text",
        label: "Balanced System - After",
        required: false,
        placeholder: "Status after work"
      },
      {
        id: "non_return_valve_before",
        type: "text",
        label: "Non Return Valve - Before",
        required: false,
        placeholder: "Status before work"
      },
      {
        id: "non_return_valve_after",
        type: "text",
        label: "Non Return Valve - After",
        required: false,
        placeholder: "Status after work"
      },
      {
        id: "general_comments",
        type: "textarea",
        label: "General Comments",
        required: false,
        placeholder: "Enter any additional comments or observations",
        rows: 4
      },
    ],
    isTemplate: true,
    restrictedToCompanies: [],
    createdBy: "admin-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "form-discovery-geyser",
    name: "Discovery Form",
    description: "Comprehensive geyser installation and replacement form",
    fields: [
      // Client Details Section
      {
        id: "field-claim-number",
        type: "text",
        label: "Claim Number",
        required: true,
        placeholder: "Claim Number",
        autoFillFrom: "claimNo",
      },
      {
        id: "field-client-name",
        type: "text",
        label: "Client",
        required: true,
        placeholder: "Client Name",
        autoFillFrom: "insuredName",
      },
      {
        id: "field-date",
        type: "date",
        label: "Date",
        required: true,
      },
      {
        id: "field-address",
        type: "text",
        label: "Address",
        required: true,
        placeholder: "Property Address",
        autoFillFrom: "riskAddress",
      },
      {
        id: "field-company-name",
        type: "text",
        label: "Company Name",
        required: true,
        placeholder: "Company Name",
        defaultValue: "BlockBusters And Partners",
      },
      {
        id: "field-plumber-name",
        type: "text",
        label: "Plumber's Name",
        required: true,
        placeholder: "Plumber's Name",
        autoFillFrom: "assignedStaffName",
      },
      {
        id: "field-license-number",
        type: "text",
        label: "License Number",
        required: false,
        placeholder: "License Number",
      },

      // Action Taken Section
      {
        id: "field-geyser-replaced",
        type: "select",
        label: "Geyser Replaced",
        required: true,
        options: ["Y", "N"],
        section: "staff",
      },
      {
        id: "field-geyser-repair",
        type: "select",
        label: "Geyser Repair",
        required: true,
        options: ["Y", "N"],
        section: "staff",
      },

      // Old Geyser Details Section
      {
        id: "field-old-geyser-type",
        type: "select",
        label: "Old Geyser Type",
        required: true,
        options: ["Electric", "Solar", "Other"],
        section: "staff",
      },
      {
        id: "field-old-geyser-other",
        type: "text",
        label: "Old Geyser Other (if Other selected)",
        required: false,
        placeholder: "Please specify",
        dependsOn: "field-old-geyser-type",
        showWhen: "Other",
      },
      {
        id: "field-old-geyser-size",
        type: "select",
        label: "Old Geyser Size",
        required: true,
        options: ["50", "100", "150", "200", "250", "300", "350"],
        section: "staff",
      },
      {
        id: "field-old-geyser-make",
        type: "select",
        label: "Old Geyser Make",
        required: true,
        options: ["Heat Tech", "Kwikot", "Gap", "WE", "Frankie", "Other"],
        section: "staff",
      },
      {
        id: "field-old-serial-number",
        type: "text",
        label: "Old Serial Number",
        required: false,
        placeholder: "Serial Number",
      },
      {
        id: "field-old-code",
        type: "text",
        label: "Old Code",
        required: false,
        placeholder: "Code",
      },
      {
        id: "field-old-no-tag",
        type: "text",
        label: "Old No Tag",
        required: false,
        placeholder: "No Tag",
      },
      {
        id: "field-wall-mounted",
        type: "text",
        label: "Wall Mounted",
        required: false,
        placeholder: "Wall Mounted",
      },
      {
        id: "field-inside-roof",
        type: "text",
        label: "Inside Roof",
        required: false,
        placeholder: "Inside Roof",
      },
      {
        id: "field-other-location",
        type: "text",
        label: "Other Location",
        required: false,
        placeholder: "Other Location",
      },

      // New Geyser Details Section
      {
        id: "field-new-geyser-type",
        type: "select",
        label: "New Geyser Type",
        required: true,
        options: ["Electric", "Solar", "Other"],
        section: "staff",
      },
      {
        id: "field-new-geyser-make",
        type: "select",
        label: "New Geyser Make",
        required: true,
        options: ["Heat Tech", "Kwikot", "Other"],
        section: "staff",
      },
      {
        id: "field-new-geyser-other",
        type: "text",
        label: "New Geyser Other (if Other selected)",
        required: false,
        placeholder: "Please specify",
        dependsOn: "field-new-geyser-make",
        showWhen: "Other",
      },
      {
        id: "field-new-geyser-size",
        type: "select",
        label: "New Geyser Size",
        required: true,
        options: ["50", "100", "150", "200", "250", "300", "350"],
        section: "staff",
      },
      {
        id: "field-new-serial-number",
        type: "text",
        label: "New Serial Number",
        required: false,
        placeholder: "Serial Number",
      },
      {
        id: "field-new-code",
        type: "text",
        label: "New Code",
        required: false,
        placeholder: "Code",
      },

      // Items Installed Section
      {
        id: "field-item-geyser",
        type: "select",
        label: "Geyser",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-drip-tray",
        type: "select",
        label: "Drip Tray",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-vacuum-breakers",
        type: "select",
        label: "Vacuum Breakers",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-platform",
        type: "select",
        label: "Platform",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-bonding",
        type: "select",
        label: "Bonding",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-isolator",
        type: "select",
        label: "Isolator",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-pressure-valve",
        type: "select",
        label: "Pressure Valve",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-relocated",
        type: "select",
        label: "Relocated",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-thermostat",
        type: "select",
        label: "Thermostat",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-element",
        type: "select",
        label: "Element",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-safety-valve",
        type: "select",
        label: "Safety Valve",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-item-non-return",
        type: "select",
        label: "Non Return",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },

      // Solar Geyser Section
      {
        id: "field-solar-vacuum-tubes",
        type: "select",
        label: "Vacuum Tubes",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-solar-flat-panels",
        type: "select",
        label: "Flat Panels",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-solar-circulation-pump",
        type: "select",
        label: "Circulation Pump",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-solar-geyser-wise",
        type: "select",
        label: "Geyser Wise",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-solar-mixing-valve",
        type: "select",
        label: "Mixing Valve",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },
      {
        id: "field-solar-panel-12v",
        type: "select",
        label: "Solar Panel 12V",
        required: true,
        options: ["Y", "N", "N/A"],
        section: "staff",
      },

    ],
    isTemplate: true,
    restrictedToCompanies: [],
    createdBy: "admin-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'material-list-form',
    name: 'Material List Form',
    description: 'Comprehensive material tracking for job completion including quantities, manufacturers, and usage',
    fields: [
      // Auto-fill Information Section
      {
        id: 'date_completed',
        type: 'date',
        label: 'Date',
        required: true
      },
      {
        id: 'technician_name',
        type: 'text',
        label: 'Plumber',
        required: true,
        placeholder: 'Auto-filled from assignment',
        autoFillFrom: 'assignedStaffName',
        readonly: true
      },
      {
        id: 'claim_number',
        type: 'text',
        label: 'Claim Number',
        required: true,
        placeholder: 'Auto-filled from job',
        autoFillFrom: 'claimNo'
      },
      {
        id: 'insurance_name',
        type: 'text',
        label: 'Insurance (Company Name - ABSA, etc.)',
        required: true,
        placeholder: 'Auto-filled from job (e.g., ABSA, Discovery, Santam)',
        autoFillFrom: 'underwriter'
      },

      // Primary Materials
      {
        id: 'geyser_unit',
        type: 'text',
        label: 'Geyser Unit - Description',
        required: false,
        placeholder: 'Enter geyser model and specifications'
      },
      {
        id: 'geyser_manufacturer',
        type: 'select',
        label: 'Geyser Manufacturer',
        required: false,
        options: ['Kwikot', 'Heattech', 'Franke', 'Bosch', 'Defy', 'Other']
      },
      {
        id: 'geyser_size',
        type: 'select',
        label: 'Geyser Size (Litres)',
        required: false,
        options: ['50L', '100L', '150L', '200L', '250L', '300L', '350L', 'Other']
      },
      {
        id: 'geyser_quantity',
        type: 'number',
        label: 'Geyser Quantity',
        required: false,
        placeholder: '0'
      },

      // Plumbing Components
      {
        id: 'copper_pipes',
        type: 'text',
        label: 'Copper Pipes - Size and Length',
        required: false,
        placeholder: 'e.g., 22mm x 3m'
      },
      {
        id: 'copper_pipes_quantity',
        type: 'number',
        label: 'Copper Pipes Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'pvc_pipes',
        type: 'text',
        label: 'PVC Pipes - Size and Length',
        required: false,
        placeholder: 'e.g., 110mm x 2m'
      },
      {
        id: 'pvc_pipes_quantity',
        type: 'number',
        label: 'PVC Pipes Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'pressure_control_valve',
        type: 'select',
        label: 'Pressure Control Valve',
        required: false,
        options: ['600kPa', '500kPa', '400kPa', 'Other', 'Not Required']
      },
      {
        id: 'pressure_valve_quantity',
        type: 'number',
        label: 'Pressure Valve Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'temperature_relief_valve',
        type: 'select',
        label: 'Temperature Relief Valve',
        required: false,
        options: ['Standard', 'High Temperature', 'Commercial Grade', 'Not Required']
      },
      {
        id: 'temp_valve_quantity',
        type: 'number',
        label: 'Temperature Relief Valve Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'isolation_cock',
        type: 'text',
        label: 'Isolation Cock - Type and Size',
        required: false,
        placeholder: 'Enter isolation cock details'
      },
      {
        id: 'isolation_cock_quantity',
        type: 'number',
        label: 'Isolation Cock Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'drip_tray',
        type: 'select',
        label: 'Drip Tray',
        required: false,
        options: ['Standard Plastic', 'Galvanized Steel', 'Stainless Steel', 'Custom Size', 'Not Required']
      },
      {
        id: 'drip_tray_quantity',
        type: 'number',
        label: 'Drip Tray Quantity',
        required: false,
        placeholder: '0'
      },

      // Electrical Components
      {
        id: 'thermostat',
        type: 'text',
        label: 'Thermostat - Type and Rating',
        required: false,
        placeholder: 'Enter thermostat specifications'
      },
      {
        id: 'thermostat_quantity',
        type: 'number',
        label: 'Thermostat Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'heating_element',
        type: 'text',
        label: 'Heating Element - Wattage and Type',
        required: false,
        placeholder: 'e.g., 3000W Low Density'
      },
      {
        id: 'element_quantity',
        type: 'number',
        label: 'Heating Element Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'electrical_cable',
        type: 'text',
        label: 'Electrical Cable - Size and Length',
        required: false,
        placeholder: 'e.g., 2.5mm² x 10m'
      },
      {
        id: 'cable_quantity',
        type: 'number',
        label: 'Electrical Cable Quantity',
        required: false,
        placeholder: '0'
      },

      // Fittings and Accessories
      {
        id: 'elbow_fittings',
        type: 'text',
        label: 'Elbow Fittings - Size and Type',
        required: false,
        placeholder: 'Enter elbow fitting details'
      },
      {
        id: 'elbow_quantity',
        type: 'number',
        label: 'Elbow Fittings Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'tee_fittings',
        type: 'text',
        label: 'Tee Fittings - Size and Type',
        required: false,
        placeholder: 'Enter tee fitting details'
      },
      {
        id: 'tee_quantity',
        type: 'number',
        label: 'Tee Fittings Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'unions',
        type: 'text',
        label: 'Unions - Size and Type',
        required: false,
        placeholder: 'Enter union details'
      },
      {
        id: 'unions_quantity',
        type: 'number',
        label: 'Unions Quantity',
        required: false,
        placeholder: '0'
      },
      {
        id: 'brackets_supports',
        type: 'text',
        label: 'Brackets and Supports',
        required: false,
        placeholder: 'Enter bracket and support details'
      },
      {
        id: 'brackets_quantity',
        type: 'number',
        label: 'Brackets Quantity',
        required: false,
        placeholder: '0'
      },

      // Additional Items
      {
        id: 'additional_items',
        type: 'textarea',
        label: 'Additional Items Used',
        required: false,
        placeholder: 'List any additional materials not covered above'
      },

      // Waste Materials
      {
        id: 'removed_materials',
        type: 'textarea',
        label: 'Materials Removed/Disposed',
        required: false,
        placeholder: 'List materials removed and disposal method'
      },

      // Summary
      {
        id: 'total_material_cost',
        type: 'number',
        label: 'Estimated Total Material Cost (R)',
        required: false,
        placeholder: '0.00'
      },
      {
        id: 'material_notes',
        type: 'textarea',
        label: 'Material Notes and Comments',
        required: false,
        placeholder: 'Additional notes about materials used, issues encountered, or recommendations'
      }
    ],
    isTemplate: true,
    restrictedToCompanies: [],
    createdBy: 'admin-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'noncompliance-form',
    name: 'Non Compliance Form',
    description: 'Comprehensive compliance assessment with auto-fill capabilities and 33-question checklist',
    fields: [
      // Auto-fill Information Section
      {
        id: 'insurance_name',
        type: 'text',
        label: 'Insurance Name',
        required: true,
        placeholder: 'Auto-filled from job',
        autoFillFrom: 'underwriter'
      },
      {
        id: 'claim_number',
        type: 'text',
        label: 'Claim Number',
        required: true,
        placeholder: 'Auto-filled from job',
        autoFillFrom: 'claimNo'
      },
      {
        id: 'client_name',
        type: 'text',
        label: 'Client Name',
        required: true,
        placeholder: 'Client first name',
        autoFillFrom: 'insuredName'
      },
      {
        id: 'client_surname',
        type: 'text',
        label: 'Client Surname',
        required: true,
        placeholder: 'Client surname'
      },
      {
        id: 'staff_name',
        type: 'text',
        label: 'Staff Name',
        required: true,
        placeholder: 'Auto-filled from assignment',
        autoFillFrom: 'assignedStaffName',
        readonly: true
      },
      {
        id: 'assessment_date',
        type: 'date',
        label: 'Date',
        required: true
      },

      // Geyser Information Section
      {
        id: 'geyser_make',
        type: 'text',
        label: 'Geyser Make',
        required: true,
        placeholder: 'Enter geyser make'
      },
      {
        id: 'geyser_serial',
        type: 'text',
        label: 'Serial Number',
        required: true,
        placeholder: 'Enter serial number'
      },
      {
        id: 'geyser_code',
        type: 'text',
        label: 'Code',
        required: true,
        placeholder: 'Enter code'
      },
      {
        id: 'plumber_indemnity',
        type: 'select',
        label: 'Plumber Indemnity',
        required: true,
        options: ['Electric geyser', 'Solar geyser', 'Heat pump', 'Pipe Repairs', 'Assessment']
      },

      // Noncompliance Issues (Questions 1-33)
      {
        id: 'issue_1',
        type: 'select',
        label: '1. Cold vacuum breaker (Must be 300mm above geyser)',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_2',
        type: 'select',
        label: '2. Hot vacuum breaker (Must be 300mm above geyser and 430mm away)',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_3',
        type: 'select',
        label: '3. Vacuum breaker not over drip tray',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_4',
        type: 'select',
        label: '4. Safety valve',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_5',
        type: 'select',
        label: '5. Not copper',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_6',
        type: 'select',
        label: '6. Need brackets',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_7',
        type: 'select',
        label: '7. Has a 90 degree short radius bend',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_8',
        type: 'select',
        label: '8. Exceeds 4m, Must be upsized to 28mm',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_9',
        type: 'select',
        label: '9. Must have 1m copper from hot water outlet',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_10',
        type: 'select',
        label: '10. Must have 1m copper from cold water inlet',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_11',
        type: 'select',
        label: '11. Pipes in roof not secured properly',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_12',
        type: 'select',
        label: '12. PRV overflow pipe not adequately secured',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_13',
        type: 'select',
        label: '13. PRV not over drip tray',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_14',
        type: 'select',
        label: '14. System unbalanced',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_15',
        type: 'select',
        label: '15. No shut off to the geyser',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_16',
        type: 'select',
        label: '16. No electrical isolator switch',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_17',
        type: 'select',
        label: '17. Pipes not electrically bonded or not correctly bonded',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_18',
        type: 'select',
        label: '18. Non return valve installed on unbalanced system (warranty can be voided if not installed)',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_19',
        type: 'select',
        label: '19. Tray overflow item not compliant',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_20',
        type: 'select',
        label: '20. Not PVC',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_21',
        type: 'select',
        label: '21. No bracket every 1m',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_22',
        type: 'select',
        label: '22. Has a 90 degree short radius bend',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_23',
        type: 'select',
        label: '23. No fall on the outlet pipe',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_24',
        type: 'select',
        label: '24. Geyser support',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_25',
        type: 'select',
        label: '25. Lagging',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_26',
        type: 'select',
        label: '26. No lagging',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_27',
        type: 'select',
        label: '27. Lagging is split',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_28',
        type: 'select',
        label: '28. Incorrect type of lagging',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_29',
        type: 'select',
        label: '29. Geyser access',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_30',
        type: 'select',
        label: '30. Roof sheets/tiles need to be removed to replace the geyser',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_31',
        type: 'select',
        label: '31. Trap door is in bathroom',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_32',
        type: 'select',
        label: '32. Trap door to be enlarged or roof access',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },
      {
        id: 'issue_33',
        type: 'select',
        label: '33. Type of pipe in the ceiling or exposed',
        required: false,
        options: ['Compliant', 'Non-Compliant', 'Not Applicable']
      },

      // Quotation Section
      {
        id: 'quotation_available',
        type: 'select',
        label: 'Please advise if a quotation can be supplied to meet these critical compliance requirements',
        required: true,
        options: ['YES', 'NO']
      },
      {
        id: 'quotation_notes',
        type: 'textarea',
        label: 'Additional Notes (Optional)',
        required: false,
        placeholder: 'Provide additional details about the quotation or compliance requirements...'
      }
    ],
    isTemplate: true,
    restrictedToCompanies: [],
    createdBy: 'admin-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

// Function to get all predefined forms (only template forms, no PDF forms)
export async function getAllPredefinedForms(): Promise<Form[]> {
  // Return only the template forms, no PDF integration
  return legacyPredefinedForms;
}

// For backward compatibility, export the legacy forms as default
export const predefinedForms = legacyPredefinedForms;
