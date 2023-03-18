<template>
  <div class="text-center" id="div">
    <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="addSender()">
      <v-text-field
        v-model="name"
        :rules="rules"
        label="الاسم"
        color="accent"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" color="accent">Submit</v-btn>
    </v-form>
  </v-sheet>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            name: null
        }
    },
    methods: {
        ...mapActions({
            'addNewSender': 'addNewSenderX'
        }),
       async addSender() {
            if (this.name) {
              const result = await  this.addNewSender({name: this.name});
              console.log('result of adding!', result);
            }
        }
    }
}
</script>

<style scoped>
#div {
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>