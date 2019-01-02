import Vue from 'vue'
import Router from 'vue-router'
import bus from 'vue-bus'
import home from '@/views/home/home'
import addGoods from '@/views/addGoods/addGoods'
import classify from '@/views/classify/classify'
import basicSetting from '@/views/goods/basicSetting/basicSetting'
import conversion from '@/views/goods/conversion/conversion'
import details from '@/views/goods/details/details'
import purchase from '@/views/goods/purchase/purchase'
import skuSetting from '@/views/goods/skuSetting/skuSetting'

Vue.use(Router, bus)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/',
          name: 'classify',
          component: classify
        },
        {
          path: '/addGoods',
          component: addGoods,
          redirect: '/addGoods/basic',
          children: [
            {
              path: '/addGoods/basic',
              name: 'basicSetting',
              component: basicSetting
            },
            {
              path: '/addGoods/conversion',
              name: 'conversion',
              component: conversion
            },
            {
              path: '/addGoods/details',
              name: 'details',
              component: details
            },
            {
              path: '/addGoods/purchase',
              name: 'purchase',
              component: purchase
            },
            {
              path: '/addGoods/skuSetting',
              name: 'skuSetting',
              component: skuSetting
            }
          ]
        }
      ]
    }

  ]
})
