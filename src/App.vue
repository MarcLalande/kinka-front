<template>
  <div>
    <nav>
      <router-link to="/bot">Bot</router-link> |
      <router-link to="/todo">Todo</router-link>
    </nav>
    <router-view />
    <!-- This renders the matched route -->
  </div>
</template>

<script setup></script>

<style>
nav {
  margin-bottom: 10px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: blue;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
