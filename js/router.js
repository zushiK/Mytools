import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// コンポーネントインポート
import HelloWorld from './components/HelloWorld';
import ProductList from './components/Product/ProductList';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/product',
      name: 'product',
      component: ProductList
    }
  ]
});
