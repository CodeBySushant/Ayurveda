// src/data/NavItems.js
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Hospital,
  BarChart3,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "गृहपृष्ठ",
    icon: LayoutDashboard,
    path: "/dashboard",
    children: [],
  },

  {
    id: "ayurveda-register",
    label: "आयुर्वेद सेवा रजिस्टर",
    icon: ClipboardList,
    path: "#",
    children: [
      { type: "title", label: "पञ्चकर्म सेवा रजिस्टर :" },
      { type: "link", label: "दर्ता", path: "/pancha-create" },
      { type: "link", label: "दैनिक सूची", path: "/pancha-list" },

      { type: "title", label: "धारासुत्र सेवा रजिस्टर :" },
      { type: "link", label: "दर्ता", path: "/ksharsutra-create" },
      { type: "link", label: "दैनिक सूची", path: "/ksharsutra" },

      { type: "title", label: "उपचारात्मक योग सेवा रजिस्टर :" },
      { type: "link", label: "दर्ता", path: "/therapy-create" },
      { type: "link", label: "दैनिक सूची", path: "/therapy-list" },

      { type: "title", label: "जेष्ठ नागरिक सेवा रजिस्टर :" },
      { type: "link", label: "दर्ता", path: "/jestha-create" },
      { type: "link", label: "दैनिक सूची", path: "/jestha-list" },

      { type: "title", label: "स्तनपायी आमा तथा शिशु सेवा रजिस्टर :" },
      { type: "link", label: "दर्ता", path: "/maternal-create" },
      { type: "link", label: "दैनिक सूची", path: "/maternal-list" },

      { type: "title", label: "फिजियोथेरेपी सेवा रजिस्टर :" },
      { type: "link", label: "सूचना", path: "/physio-create" },
      { type: "link", label: "दैनिक सूची", path: "/physio-list" },

      { type: "title", label: "अकुपुन्चर सेवा रजिस्टर :" },
      { type: "link", label: "सूचना", path: "/aku-create" },
      { type: "link", label: "दैनिक सूची", path: "/aku-list" },

      { type: "title", label: "शल्य चिकित्सा सेवा रजिस्टर :" },
      { type: "link", label: "सूचना", path: "/surgery-create" },
      { type: "link", label: "दैनिक सूची", path: "/surgery-list" },
    ],
  },

  {
    id: "common-forms",
    label: "साझा अभिलेख फारामहरु",
    icon: FileText,
    path: "#",
    children: [
      { type: "title", label: "मूल दर्ता रजिस्टर :" },
      { type: "link", label: "दर्ता", path: "/master-create" },
      { type: "link", label: "दैनिक सूची", path: "/master-list" },

      { type: "link", label: "थप सेवा बिलिङ दर्ता", path: "/billing-create" },
      {
        type: "link",
        label: "थप सेवा बिलिङ दैनिक सूची",
        path: "/billing-list",
      },

      { type: "title", label: "प्रेषण / स्थानान्तरण पुर्जा :" },
      { type: "link", label: "दर्ता", path: "/referral" },
      { type: "link", label: "दैनिक सूची", path: "/referral-list" },

      { type: "title", label: "फिर्ता पुर्जा :" },
      { type: "link", label: "दर्ता", path: "/return-slip" },
      { type: "link", label: "दैनिक सूची", path: "/return-list" },
    ],
  },

  {
    id: "hospital-registration",
    label: "अस्पताल सेवा दर्ता",
    icon: Hospital,
    path: "#",
    children: [
      { type: "title", label: "बिरामी प्रवेश र डिस्चार्ज दर्ता :" },
      { type: "link", label: "सूचना", path: "/patient-admission" },
      { type: "link", label: "दैनिक सूची", path: "/patient-admission-list" },

      { type: "title", label: "आपतकालीन सेवा दर्ता :" },
      { type: "link", label: "सूचना", path: "/emergency-create" },
      { type: "link", label: "दैनिक सूची", path: "/emergency-list" },
    ],
  },

  {
    id: "reports",
    label: "रिपोर्ट",
    icon: BarChart3,
    path: "#",
    children: [
      { type: "link", label: "सेवा बिल सूची", path: "/service-report" },
      {
        type: "link",
        label: "सेवा बिल फिर्ती प्रतिवेदन",
        path: "/return-report",
      },
      { type: "link", label: "Hospital Reporting 1", path: "/hospital-report" },
      { type: "link", label: "Hospital Reporting 2", path: "/hospital-report" },
      { type: "link", label: "मूल दर्ता प्रतिवेदन", path: "/master-report-1" },
      {
        type: "link",
        label: "मूल दर्ता प्रतिवेदन २",
        path: "/master-report-2",
      },
      { type: "link", label: "योग सेवा प्रतिवेदन", path: "/therapy-report" },
      {
        type: "link",
        label: "जेष्ठ नागरिक सेवा प्रतिवेदन",
        path: "/elder-report",
      },
      {
        type: "link",
        label: "स्तनपायी आमा तथा शिशु सेवा प्रतिवेदन",
        path: "/maternal-report",
      },
      {
        type: "link",
        label: "फिजियोथेरेपी सेवा प्रतिवेदन",
        path: "/physio-report",
      },
      { type: "link", label: "अकुपुन्चर सेवा प्रतिवेदन", path: "/aku-report" },
      {
        type: "link",
        label: "शल्य चिकित्सा सेवा प्रतिवेदन",
        path: "/surgery-report",
      },
    ],
  },
];
