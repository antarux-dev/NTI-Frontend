// ── Auth & User types ──────────────────────────────────────────────────────

export type UserStatus = 'pending' | 'active' | 'suspended' | 'deleted';
export type AccountType = 'student' | 'company' | 'mentor' | 'admin';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  accountType: AccountType;
  createdAt: string;
}

export interface StudentProfile {
  userId: number;
  studyProgram: string;
  yearOfStudy: number;
  skills: string[];
  cvUrl?: string;
}

export interface CompanyProfile {
  id: number;
  name: string;
  ico: string;
  sector: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
}

// ── Auth payloads ──────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterStudentPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  studyProgram: string;
  yearOfStudy: number;
  gdprConsent: boolean;
}

export interface RegisterCompanyPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  companyName: string;
  ico: string;
  sector: string;
  gdprConsent: boolean;
}

export interface RegisterMemberPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  inviteToken: string;
  gdprConsent: boolean;
}

export type RegistrationType = 'student' | 'company' | 'member';

// ── Program types ──────────────────────────────────────────────────────────

export type ProgramType = 'A' | 'B';
export type CallStatus = 'draft' | 'open' | 'closed' | 'evaluating' | 'finished';
export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'formal_check'
  | 'under_review'
  | 'revision_requested'
  | 'approved'
  | 'rejected'
  | 'onboarding'
  | 'active'
  | 'completed'
  | 'archived';

export interface Program {
  id: number;
  type: ProgramType;
  name: string;
  description: string;
  rules: string;
  deadline?: string;
}

export interface Call {
  id: number;
  programId: number;
  title: string;
  description: string;
  status: CallStatus;
  deadline: string;
  evaluationCriteria: string[];
}

// ── Navigation types ───────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  to?: string;
  href?: string;
  children?: NavItem[];
}

// ── API types ──────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

// ── FAQ & News ─────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  imageUrl?: string;
}

// ── Partners & Mentors ─────────────────────────────────────────────────────

export interface Partner {
  id: number;
  name: string;
  logoUrl?: string;
  website?: string;
  sector: string;
}

export interface Mentor {
  id: number;
  firstName: string;
  lastName: string;
  title?: string;
  bio?: string;
  expertise: string[];
  avatarUrl?: string;
}
