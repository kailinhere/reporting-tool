import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/enterprise',
    component: () => import('pages/AgGridEnterprise.vue'),
  },
  {
    path: '/free',
    component: () => import('pages/AgGridFree.vue'),
  },
];

export default routes;
