<template>
  <order-by :servers="servers" :search="search" orderBy="updated_at" order="desc" />
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
