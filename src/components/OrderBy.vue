<template>
  <v-container class="fill-height">
    <v-layout text-center wrap>
      <repo-list :items="items" />
      <v-pagination v-model="page" :length="length"></v-pagination>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

import RepoList from "./RepoList";

export default {
  props: ["servers", "search", "orderBy", "order"],
  components: {
    RepoList
  },
  mounted() {},
  data: () => ({
    page: 1
  }),
  computed: {
    length() {
      /*
      let n = Object.values(this.servers || []).reduce(
        (accumulator, currentValue) => accumulator + currentValue.RepoCount,
        0
      );
      */
      if (this.remoteData == null) {
        return 1;
      }
      let n = this.remoteData.Total;
      if (n == 0) {
        n++;
      }
      n = Math.ceil(n / 10);
      //console.log(n,Object.values(this.servers).length)
      return n;
    },
    items() {
      //console.log(this.remoteData)
      if (this.remoteData == null) {
        return [];
      }
      //TODO default icon
      //TODO filter search output to opmrimize bandwith
      return this.remoteData.Repositories.map(x => {
        return {
          title: x.full_name,
          subtitle: x.description,
          host: x.host,
          icon: x.avatar_url,
          link: x.html_url,
          stars_count: x.stars_count,
          forks_count: x.forks_count,
          updated_at: x.updated_at
        };
      });
    }
  },
  asyncComputed: {
    remoteData() {
      let baseUrl = process.env.VUE_APP_API_BASEURL;
      if (baseUrl === "") {
        baseUrl = window.location.origin;
      }
      
      var u = new URL("api/v1/search", baseUrl);
      u.searchParams.set("q", this.search);
      u.searchParams.set("page", this.page);
      u.searchParams.set("order_by", this.orderBy || "stars_count");
      u.searchParams.set("order", this.order || "desc");

      return axios
        .get(u)
        .then(response => response.data)
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    }
  }
};
</script>
