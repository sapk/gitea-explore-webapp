<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item :to="item.path" v-for="item in items" :key="item.text">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader
          class="mt-4 grey--text text--darken-1"
        >SERVEURS ({{Object.keys(servers).length}})</v-subheader>
        <v-list>
          <v-list-item
            v-for="item in serversOrdered"
            :key="item.Host"
            target="_blank"
            :href="'https://'+item.Host"
          >
            <v-list-item-avatar>
              <img :src="`https://${item.Host}/img/favicon.png`" :alt="item.Host" />
            </v-list-item-avatar>
            <v-list-item-title>
              {{item.Host}}
              <span
                v-if="item.RepoCount > 0"
                class="grey--text text--lighten-1"
              >{{item.RepoCount}}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="$vuetify.theme.dark" class="ma-4" @change="setTheme"></v-switch>
          </v-list-item-action>
          <v-list-item-title
            v-if="$vuetify.theme.dark"
            class="grey--text text--darken-1"
          >Light theme</v-list-item-title>
          <v-list-item-title v-else class="grey--text text--darken-1">Dark theme</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="green  " dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-img
          :src="require('./assets/logo.svg')"
          contain
          height="36"
          width="36"
          style="flex: 0 0 auto; image-rendering: optimizespeed;"
        ></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title @click.stop="drawer = !drawer" class="mr-12 align-center">
        <span class="title">Explore</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-row align="center" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          :append-icon="iconSearch"
          color="white"
          v-model="searchDebounced"
          hide-details
        ></v-text-field>
      </v-row>
    </v-app-bar>

    <v-content>
      <router-view :servers="servers" :search="searchFilteredDebounced"></router-view>
    </v-content>
  </v-app>
</template>

<style>
.v-navigation-drawer__content .v-list-item__title > span {
  float: right;
}
.v-navigation-drawer__content > .v-list {
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.v-navigation-drawer__content > .v-list > .v-list-item {
  flex: none;
}

.v-navigation-drawer__content > .v-list > .v-list {
  overflow-y: auto;
}

/* height of item 48 */
</style>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
import { mdiTrendingUp, mdiCallSplit, mdiHistory, mdiMagnify } from '@mdi/js';

//console.log(process.env);

export default {
  name: "App",
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    search: "",
    items: [
      { icon: mdiTrendingUp, text: "Most Popular", path: "/" },
      { icon: mdiCallSplit, text: "Most Forked", path: "/fork" },
      { icon: mdiHistory, text: "Last updated", path: "/history" }
    ],
    iconSearch: mdiMagnify,
    servers: []
  }),
  mounted() {
    let baseUrl = process.env.VUE_APP_API_BASEURL;
    if (baseUrl === "") {
      baseUrl = window.location.origin;
    }

    var u = new URL("api/v1/servers", baseUrl);
    axios
      .get(u)
      .then(response => {
        this.servers = response.data;
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log(error);
      });
  },
  computed: {
    searchDebounced: {
      get() {
        return this.search;
      },
      set: debounce(function(newValue) {
          this.search = newValue;
      }, 250)
    },
    searchFilteredDebounced() {
      if (this.search.length < 3) {
        return "*";
      }
      return this.search;
    },
    serversOrdered: function() {
      return Object.values(this.servers).sort(function name(el1, el2) {
        return el1.RepoCount < el2.RepoCount;
      });
    }
  },
  methods: {
    setTheme() {
      //Cache theme
      localStorage.setItem("darkTheme", this.$vuetify.theme.dark);
    }
  },
  created() {
    this.$vuetify.theme.dark = localStorage.darkTheme == "true";
  }
};
</script>