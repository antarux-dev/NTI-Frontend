import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
  // ── Public web routes ──────────────────────────────────────────────────
  {
    path: '/',
    component: () => import('@/components/layout/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/web/Homepage.vue'),
        meta: { title: 'NTI — Nitriansky technologický inkubátor' },
      },
      // Programs
      {
        path: 'programy',
        children: [
          {
            path: '',
            name: 'programs',
            component: () => import('@/pages/programs/ProgramsOverview.vue'),
            meta: { title: 'Programy — NTI' },
          },
          {
            path: 'program-a',
            name: 'program-a',
            component: () => import('@/pages/programs/ProgramA.vue'),
            meta: { title: 'Program A — NTI' },
          },
          {
            path: 'program-b',
            name: 'program-b',
            component: () => import('@/pages/programs/ProgramB.vue'),
            meta: { title: 'Program B — NTI' },
          },
          {
            path: 'vyzvy',
            name: 'challenges',
            component: () => import('@/pages/programs/ChallengesPage.vue'),
            meta: { title: 'Výzvy — NTI' },
          },
          {
            path: 'podmienky',
            name: 'conditions',
            component: () => import('@/pages/programs/ConditionsPage.vue'),
            meta: { title: 'Podmienky — NTI' },
          },
        ],
      },
      // For companies
      {
        path: 'pre-firmy',
        children: [
          {
            path: '',
            name: 'for-companies',
            component: () => import('@/pages/companies/ForCompaniesPage.vue'),
            meta: { title: 'Pre firmy — NTI' },
          },
          {
            path: 'ako-funguju-projekty',
            name: 'how-projects-work',
            component: () => import('@/pages/companies/HowProjectsWork.vue'),
            meta: { title: 'Ako fungujú projekty — NTI' },
          },
          {
            path: 'partneri',
            name: 'partners',
            component: () => import('@/pages/companies/PartnersPage.vue'),
            meta: { title: 'Partneri — NTI' },
          },
          {
            path: 'mentori',
            name: 'mentors',
            component: () => import('@/pages/companies/MentorsPage.vue'),
            meta: { title: 'Mentori — NTI' },
          },
        ],
      },
      // About NTI
      {
        path: 'o-nti',
        children: [
          {
            path: '',
            name: 'about',
            component: () => import('@/pages/about/AboutPage.vue'),
            meta: { title: 'O NTI' },
          },
          {
            path: 'kontakt',
            name: 'contact',
            component: () => import('@/pages/about/ContactPage.vue'),
            meta: { title: 'Kontakt — NTI' },
          },
          {
            path: 'nasa-misia',
            name: 'mission',
            component: () => import('@/pages/about/MissionPage.vue'),
            meta: { title: 'Naša misia — NTI' },
          },
          {
            path: 'faq',
            name: 'faq',
            component: () => import('@/pages/about/FaqPage.vue'),
            meta: { title: 'FAQ — NTI' },
          },
          {
            path: 'novinky',
            name: 'news',
            component: () => import('@/pages/about/NewsPage.vue'),
            meta: { title: 'Novinky — NTI' },
          },
        ],
      },
    ],
  },

  // ── Auth routes ────────────────────────────────────────────────────────
  {
    path: '/auth',
    component: () => import('@/components/layout/AuthLayout.vue'),
    children: [
      {
        path: 'prihlasenie',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
        meta: { title: 'Prihlásenie — NTI', guest: true },
      },
      {
        path: 'registracia',
        name: 'register',
        component: () => import('@/pages/auth/RegisterPage.vue'),
        meta: { title: 'Registrácia — NTI', guest: true },
      },
      {
        path: 'registracia/student',
        name: 'register-student',
        component: () => import('@/pages/auth/RegisterStudentPage.vue'),
        meta: { title: 'Registrácia študenta — NTI', guest: true },
      },
      {
        path: 'registracia/firma',
        name: 'register-company',
        component: () => import('@/pages/auth/RegisterCompanyPage.vue'),
        meta: { title: 'Registrácia firmy — NTI', guest: true },
      },
      {
        path: 'registracia/clen',
        name: 'register-member',
        component: () => import('@/pages/auth/RegisterMemberPage.vue'),
        meta: { title: 'Registrácia člena firmy — NTI', guest: true },
      },
    ],
  },

  // ── App (authenticated) routes ─────────────────────────────────────────
  {
    path: '/app',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      // Shared dashboard (redirects based on role)
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/pages/app/student/StudentDashboard.vue'),
        meta: { title: 'Dashboard — NTI' },
      },

      // ── Student routes ────────────────────────────────────────────────
      {
        path: 'prihlasenia',
        name: 'student-applications',
        component: () => import('@/pages/app/student/StudentApplications.vue'),
        meta: { title: 'Moje prihlášky — NTI' },
      },
      {
        path: 'prihlasenia/nova',
        name: 'student-apply',
        component: () => import('@/pages/app/student/ApplicationForm.vue'),
        meta: { title: 'Nová prihláška — NTI' },
      },
      {
        path: 'prihlasenia/:id',
        name: 'student-application-detail',
        component: () => import('@/pages/app/student/StudentApplicationDetail.vue'),
        meta: { title: 'Detail prihlášky — NTI' },
      },
      {
        path: 'profil',
        name: 'student-profile',
        component: () => import('@/pages/app/student/StudentProfile.vue'),
        meta: { title: 'Môj profil — NTI' },
      },
      {
        path: 'tim',
        name: 'student-team',
        // lazy placeholder – extend later
        component: () => import('@/pages/app/student/StudentDashboard.vue'),
        meta: { title: 'Môj tím — NTI' },
      },

      // ── Company routes ────────────────────────────────────────────────
      {
        path: 'profil-firmy',
        name: 'company-profile',
        component: () => import('@/pages/app/company/CompanyProfile.vue'),
        meta: { title: 'Profil firmy — NTI' },
      },
      {
        path: 'projekty',
        name: 'company-projects',
        component: () => import('@/pages/app/company/CompanyDashboard.vue'),
        meta: { title: 'Projekty — NTI' },
      },
      {
        path: 'projekty/novy',
        name: 'company-new-project',
        component: () => import('@/pages/app/company/CompanyDashboard.vue'),
        meta: { title: 'Nový projekt — NTI' },
      },
      {
        path: 'clenovia',
        name: 'company-members',
        component: () => import('@/pages/app/company/CompanyDashboard.vue'),
        meta: { title: 'Členovia — NTI' },
      },
    ],
  },

  // ── 404 ────────────────────────────────────────────────────────────────
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/web/NotFoundPage.vue'),
    meta: { title: '404 — NTI' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: 'smooth' };
  },
});

// ── Navigation guards ──────────────────────────────────────────────────────
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  // Set page title
  const title = to.meta.title as string | undefined;
  document.title = title ?? 'NTI — Nitriansky technologický inkubátor';

  // Fetch user if token exists but user is not loaded
  if (authStore.token && !authStore.user) {
    await authStore.fetchMe();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }

  if (to.meta.guest && authStore.isAuthenticated) {
    return next({ name: 'dashboard' });
  }

  next();
});

export default router;
