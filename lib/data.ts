import type { Certification, Project, Skill } from '@/types';

export const projects: Project[] = [
  {
    slug: 'smartscan',
    name: 'SmartScan System',
    role: 'Project Manager',
    tagline: 'C# QR + RFID attendance tracking for schools',
    problem:
      'Manual attendance logs in school settings were slow to process, easy to falsify, and gave administrators no real-time visibility into who was actually on campus.',
    action:
      'Led the project as Project Manager, directing a C# development team to build a dual-factor capture system combining QR code scanning and RFID tag reads, and owning the data pipeline that reconciled both inputs into a single attendance record.',
    result:
      'Replaced manual logging with an automated capture flow, cut attendance-processing errors, and gave school administrators a real-time, tamper-resistant view of campus attendance.',
    stack: ['C#', '.NET', 'RFID', 'QR Code', 'SQL Server'],
    image: '/projects/smartscan.svg',
    hasArchitecture: false,
  },
  {
    slug: 'sukilink',
    name: 'SukiLink',
    role: 'Project Leader',
    tagline: 'Offline-first mobile app for small-to-mid salon businesses',
    problem:
      'Small and mid-sized salons needed an affordable booking and customer-management tool, but existing options assumed constant connectivity — unreliable in the areas these salons operated in — and did little to bring repeat customers back.',
    action:
      'Led architecture and delivery as Project Leader: designed an offline-first data layer so the app stayed fully usable without a live connection, structured the codebase around clean MVVM for testability, and drove a UI/UX overhaul focused on retention — faster rebooking, visible loyalty cues, and a simplified booking flow.',
    result:
      'Shipped a mobile app that salon staff could rely on regardless of connection quality, with a retention-focused redesign that measurably improved repeat bookings for partner salons.',
    stack: ['Mobile', 'MVVM', 'Offline-first sync', 'REST APIs'],
    image: '/projects/sukilink.svg',
    hasArchitecture: true,
  },
  {
    slug: 'ealerto',
    name: 'E-Alerto',
    role: 'Project Leader',
    tagline: 'Cross-platform emergency alert system for LGUs',
    problem:
      'Local government units lacked a unified way to collect ground-level incident reports and broadcast verified alerts quickly across multiple channels during emergencies, leaving responders working from fragmented, delayed information.',
    action:
      'Led the cross-platform build as Project Leader: crowdsourced incident reporting feeding a GIS-based geomapping engine, centralized dispatch across SMS and public-address systems, a digital-handshake acknowledgment flow so dispatchers knew alerts were received, and a UI that automatically reconfigured itself based on the declared disaster level.',
    result:
      'Gave LGU responders a single system to see, verify, and broadcast incident information in minutes instead of relying on fragmented manual channels, across both citizen-facing and responder-facing surfaces.',
    stack: ['Cross-platform', 'GIS', 'Geomapping', 'SMS Gateway', 'Crowdsourcing'],
    image: '/projects/ealerto.svg',
    hasArchitecture: true,
  },
];

export const skills: Skill[] = [
  { name: 'C# / .NET', category: 'Software Development', level: 5 },
  { name: 'Cross-platform Mobile', category: 'Software Development', level: 4 },
  { name: 'React / Next.js', category: 'Software Development', level: 4 },
  { name: 'MVVM Architecture', category: 'Software Development', level: 5 },
  { name: 'Offline-first Data Sync', category: 'Software Development', level: 4 },
  { name: 'REST API Design', category: 'Software Development', level: 4 },
  { name: 'SQL & Relational Data', category: 'Software Development', level: 4 },
  { name: 'Git / Version Control', category: 'Software Development', level: 5 },

  { name: 'Cyber Threat Monitoring', category: 'Security & Networking', level: 3 },
  { name: 'SOC Fundamentals', category: 'Security & Networking', level: 3 },
  { name: 'Network Security (Fortinet NSE)', category: 'Security & Networking', level: 3 },
  { name: 'DevSecOps Mindset', category: 'Security & Networking', level: 4 },
  { name: 'Secure SDLC Practices', category: 'Security & Networking', level: 4 },
  { name: 'Incident Response Basics', category: 'Security & Networking', level: 3 },

  { name: 'Team Leadership', category: 'Leadership', level: 5 },
  { name: 'Agile Project Management', category: 'Leadership', level: 5 },
  { name: 'Stakeholder Communication', category: 'Leadership', level: 4 },
  { name: 'Mentoring & Delegation', category: 'Leadership', level: 4 },
  { name: 'Risk Management', category: 'Leadership', level: 4 },
];

export const certifications: Certification[] = [
  {
    name: 'Cyber Threat Monitoring 1, NC1',
    issuer: 'Radenta Academy / TESDA TTSP',
    category: 'Security & Networking',
  },
  {
    name: 'Fortinet NSE 1',
    issuer: 'Fortinet',
    category: 'Security & Networking',
  },
  {
    name: 'Fortinet NSE 2',
    issuer: 'Fortinet',
    category: 'Security & Networking',
  },
  {
    name: 'Fortinet NSE 3',
    issuer: 'Fortinet',
    category: 'Security & Networking',
  },
  {
    name: 'Wadhwani Certificate of Completion',
    issuer: 'Wadhwani Foundation',
    category: 'Software Development',
  },
  {
    name: 'Trailhead Kiroverse Training',
    issuer: 'Salesforce Trailhead',
    category: 'Software Development',
  },
  {
    name: 'Management 101',
    issuer: 'Leadership Training Program',
    category: 'Leadership',
  },
  {
    name: 'L101 – L301',
    issuer: 'Leadership Training Program',
    category: 'Leadership',
  },
];
