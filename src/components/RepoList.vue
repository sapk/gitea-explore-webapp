<template>
  <v-list three-line style="width: 100%;">
    <v-list-item v-for="item in items" :key="item.title" v-ripple :href="item.link" target="_blank">
      <v-list-item-avatar>
        <v-img :src="item.icon"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          {{item.title}}
          <span class="grey--text text--darken-1">@ {{item.host}}</span>
        </v-list-item-title>
        <v-list-item-subtitle>{{item.subtitle}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <span style="font-size:85%;">
          <v-icon color="grey lighten-1">{{call_split}}</v-icon>
          <span class="grey--text text--lighten-4">{{item.forks_count}}</span>
          <v-icon color="grey lighten-1">{{star}}</v-icon>
          <span class="grey--text text--lighten-4">{{item.stars_count}}</span>
        </span>
        <span class="grey--text" style="font-size: 75%;">{{formatSince(item.updated_at)}}</span>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.v-list {
  margin-top: 1rem;
  margin-bottom: 3rem;
}
.v-list-item__title,
.v-list-item__subtitle {
  text-align: left;
}
</style>
<script>
import dayjs from "dayjs"; //TODO locales
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { mdiCallSplit, mdiStar } from '@mdi/js'

export default {
  props: ["items"],
  data: () => ({
    call_split: mdiCallSplit,
    star: mdiStar,
  }),
  methods: {
    formatSince(updated_at) {
      return dayjs(updated_at).fromNow();
    }
  }
};
</script>
