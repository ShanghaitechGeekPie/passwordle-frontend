<script setup lang="ts">
import GuessDisplay from "./components/GuessDisplay.vue";

let guess = {
  hash: "7Ih7WOZjfBzfAgdNMHeHOQ==",
  guess: [
    "Exact",
    "Wrong",
    "Wrong",
    "Wrong",
    "Close",
    "Wrong",
    "Wrong",
    "Wrong",
    "Close",
    "Wrong",
    "Wrong",
    "Close",
    "Close",
    "Wrong",
    "Wrong",
    "Wrong",
    "Wrong",
    "Wrong",
    "Wrong",
    "Wrong",
    "Wrong",
    "Exact",
    "Exact",
    "Exact"
  ]
};
</script>

<template>
  <GuessDisplay :guess="guess"/>
</template>

<style>
</style>
