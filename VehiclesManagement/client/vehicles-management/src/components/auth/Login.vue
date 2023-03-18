<template>
      <v-content>

         <v-container >
            <v-layout >
               <v-flex >
                  <v-container>
                  <v-row no-gutters>
                     <v-col cols="4"  class="flex-grow-0 flex-shrink-0">
                        <v-card class="elevation-12" style="margin-top: 30%
                        ">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title style="margin-left: 30%;">ادارة المركبات والرحبات</v-toolbar-title>
                     </v-toolbar>
                   <v-card-title v-if="error"  class="justify-center">
                       <span style="color: red">
                        كلمة المرور أو اسم المستخدم غير صحيح
                    </span>
                   </v-card-title>
                     <v-card-text>
                        <v-form ref="loginForm" @submit.prevent="login()">
                           <v-text-field
                              prepend-icon="person"
                              name="login"
                           
                              v-model="username"
                              placeholder="اسم المستخدم"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                            
                              v-model="password"
                              placeholder="كلمة المرور"
                              type="password"
                           ></v-text-field>
                           <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit" style="margin-right:40%">تسجيل الدخول</v-btn>
                     </v-card-actions>
                        </v-form>
                     </v-card-text>
                     
                  </v-card>
                     </v-col>
                     <v-col cols="8"  style="min-width: 50px"
            class="flex-grow-0 flex-shrink-1">
                        <v-img 
                      
                  :src="imgSrc"></v-img>
                     </v-col>
                  </v-row>
               </v-container>
                
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
</template>
 
<script>

import { mapActions } from 'vuex';

 export default {
    data() {
        return {
            username: null,
            password: null,
            error: null,
            imgSrc: require('@/assets/images/moi.jpg')
        }
    },
    methods: {
        ...mapActions({'loginActions': 'loginActions'}),
      async  login() {
            if (this.username, this.password) {
            let status = await this.loginActions({username: this.username, password: this.password});
            console.log('Login.vue: status', status);
            if (!status) {
               console.log('login erre')
                this.error = true;
            } else {
               this.error = false;
               this.$router.push({ name: 'Home', });
            }
            }
           
        }
    }
 };
 </script>
 
<style scoped>
.headline {
    text-align: center !important;
}
