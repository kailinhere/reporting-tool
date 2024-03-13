import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/enterprise',
    component: () => import('src/pages/AgGrid/AgGridEnterprise.vue'),
  },
  {
    path: '/free',
    component: () => import('src/pages/AgGrid/AgGridFree.vue'),
  },
  {
    path: '/stimulsoft',
    component: () => import('src/pages/Stimulsoft/StimulsoftReport.vue'),
  },
];

export default routes;
