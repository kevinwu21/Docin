---
layout: home

hero:
  name: noteWk
  text: developed by Kevin
  tagline: Windows / MacOS / Linux 指南手册
  image:
    src: /undraw_Outer_space_g.png
    alt:
  actions:
    - theme: brand
      text: 进入文档
      link: /linux/hadoop/1basic
    - theme: alt
      text: Gitee主页
      link: https://gitee.com/kevinwu_21

features:
  - icon:  🎒
    title: Windows
    details: 应用软件 / 使用技巧 / 偏好设置
  - icon: 🤯
    title: MacOS
    details: 应用软件 / 偏好设置 / 终端命令
  - icon: 🏎
    title: Linux
    details: 入门教程 / 开发环境 / 终端命令
---

<style>
  /* body{
    filter:grayscale(1) !important;
  } */
  :root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
  }
  @media screen and (min-width: 1000px) {
    .image-src{
      margin-left: 100px;
      margin-top: 20px;
    }
  }
  @media screen and (min-width: 1200px) {
    .image-src{
      margin-left: 180px;
    }
  }
</style>