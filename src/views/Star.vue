<template>
  <order-by :servers="servers" :search="search" orderBy="stars_count" />
</template>

<script>
import OrderBy from "../components/OrderBy";

export default {
  props: ["servers", "search"],
  components: {
    OrderBy
  }
};
</script>
