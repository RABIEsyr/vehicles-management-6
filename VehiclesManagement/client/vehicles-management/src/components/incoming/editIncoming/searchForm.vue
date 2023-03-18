<template>
    <v-sheet width="300" class="mx-auto">
        <v-form fast-fail >
            <v-row>
              <v-col>
                <v-text-field v-model="serialNumber" label="الرقم التسلسلي" type="number"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="date" label="التاريخ" type="number"></v-text-field>
              </v-col>
            
            </v-row>

            <v-btn @click="search()" block class="mt-2" color = "accent">بحث</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            serialNumber: null,
            date: null
        }
    },
    methods: {
        ...mapMutations({
            'setSerialNumberSearch': 'setSerialNumberSearch',
            'setDateSearch': 'setDateSearch'
        }),
        ...mapActions({
            'searchForIncoming': 'searchForIncoming'
        }),
        search() {
            console.log(this.serialNumber, '_', this.date)
            if (this.serialNumber && this.date) {
                this.setSerialNumberSearch(this.serialNumber);
                this.setDateSearch(this.date)
                this.searchForIncoming({serial: this.serialNumber, date: this.date})
            }
        }
    }
}
</script>

<style></style>