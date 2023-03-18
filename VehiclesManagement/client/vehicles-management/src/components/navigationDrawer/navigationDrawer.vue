<template>
  
        <v-navigation-drawer
       style="float: left"
        permanent
        expand-on-hover="mini"  
        
        :width="!isEpandIncoming ? 200 : 300"
        
        :height="400"
        
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img  src="@/assets/jan.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>
     

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Kenan Zarqa 
              </v-list-item-title>
              <v-list-item-subtitle>business account</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
        <!-- <router-link > -->
          <v-list-item link @click="toggleExpandIncoming()">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>الرسائل الواردة</v-list-item-title>
          </v-list-item>

          <!-- incoming -->
          <div class="incoming">
            <v-list-item link v-if="isEpandIncoming" @click="toggleExpandIncoming('add-incoming')">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title> اضافة الرسائل</v-list-item-title>
          </v-list-item>
            <v-list-item link v-if="isEpandIncoming" @click="toggleExpandIncoming('edit-incoming')">
            <v-list-item-icon>
              <v-icon>mdi-view-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title> استعراض الرسائل</v-list-item-title>
          </v-list-item>
          </div>
        <!-- </router-link> -->
        <v-list-item link @click="navToSender()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title> المرسل</v-list-item-title>
          </v-list-item>

        
         <v-list-item style="cursor: pointer;" @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>خروج</v-list-item-title>
          </v-list-item>

         <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <!-- <template v-slot:activator="{ on, attrs }">
           <v-list-item link  v-bind="attrs"
            v-on="on">
          <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>خروج</v-list-item-title>
          </v-list-item>
          

        </template> -->
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >مغادرة الموقع</v-toolbar>
            <v-card-text>
              <div style="justify-content: center">الى اللقاء</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-row>
                <v-col>
                  <v-btn
                  text
                  @click="dialog.value = false"
                  >الغاء</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                  text
                  @click="logout()"
                  >خروج</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
         
        </v-list>
        
      </v-navigation-drawer>
    
     
</template>

<script>
// import router from '../../router/router';
import { mapMutations } from 'vuex';
export default {
    data() {
    return {
      isEpandIncoming: false
    }
  },
  methods: {
    ...mapMutations({
      'logoutMutations': 'logoutMutations'
    }),
    toggleExpandIncoming(path) {
      this.isEpandIncoming = !this.isEpandIncoming
      if (path) {
        console.log('path', path)
        this.$router.push(path);
      }
    },

    logout() {
        localStorage.removeItem('token');
        this.logoutMutations();
        this.$router.push({ name: 'Login', });
    },
    navToSender() {
      this.$router.push({ name: 'AddSender', });
    }
  }
}
</script>

<style scoped>
.incoming {
  margin-left: 20px;
}
</style>