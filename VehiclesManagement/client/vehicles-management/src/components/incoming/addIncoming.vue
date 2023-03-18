<template>
  <div class="container" style="max-width: 800px;">

    <form class="well form-horizontal" id="contact_form">
      <fieldset>

        <!-- Form Name -->
        <legend>
          <span style="margin-left: 40%">كتاب وارد</span>
        </legend>

        <!-- Text input-->

        <div class="row" style="margin-left: 30px">
          <div></div>
          <div class="col-lg-3 col-sm-4 col-sm-offset-2 col-lg-offset-3 col-md-offset-2">
            <div class="form-group">
              <div class="inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-refresh"></i></span>
                  <input name="serial" class="form-control" type="number" v-model="serialNumber">
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <label class="my-custom-label">الرقم المتسلسل</label>
          </div>
        </div>
        <!-- Text input-->

        <div class="row">
          <div class="col-lg-6 col-sm-4 col-sm-offset-2">
            <div class="form-group">
              <div class="inputGroupContainer ">
                <div class="input-group">
                  <span class="input-group-addon"> و /</span>
                  <input name="messaageNumber" class="form-control" type="number" v-model="messageNumber">
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <label class="my-custom-label">رقم الرسالة</label>
          </div>
        </div>


        <!-- Text input-->
        <div class="row">
          <div class="col-lg-6 col-sm-4 col-sm-offset-2">
            <div class="form-group">
              <div class="inputGroupContainer">
                <div class="input-group" style="margin-left: 55px;">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                  <!-- <select name="state" class="form-control selectpicker"  v-model="senderName"> 
                <option value=" ">Please select your state</option>
                <option>Alabama</option>
                <option>Alaska</option>
              </select> -->
                  <Dropdown v-model="aaa" style="z-index: 10;" :options="sendersName" v-on:selected="validateSelection"
                  :value="'ss'"
                     :disabled="false" name="zipcode"
                    placeholder="Please select an option">
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <label class="my-custom-label">المرسل</label>
          </div>
        </div>


        <!-- Text input-->
        <div class="row">
          <div class="col-lg-6 col-sm-4 col-sm-offset-2">
            <div class="form-group">
              <div class="inputGroupContainer ">
                <div class="input-group">
                  <div class="form-group">
                    <div class="inputGroupContainer">
                      <div class="input-group" style="width: 380px; margin-left: 16px">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                        <!-- <input name="email" placeholder="E-Mail Address" class="form-control" type="text"> -->
                        <date-picker class="form-control" @dp-hide="doSomethingOnHide" @dp-change="doSomethingOnChange"
                          v-model="date"></date-picker>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <label class="my-custom-label">تاريخ ورود الرسالة</label>
          </div>
        </div>

        <!-- Text input-->

        <div class="row">
          <div class="col-lg-6 col-sm-4 col-sm-offset-2">
            <div class="form-group">
              <div class="inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
                  <textarea name="result" class="form-control" type="text" v-model="result"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <label class="my-custom-label">النتيجة</label>
          </div>
        </div>

        <!-- Text input-->

        <div class="row">
          <div class="col-lg-6 col-sm-4 col-sm-offset-2">
            <div class="form-group">
              <div class="inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-paperclip"></i></span>
                  <textarea name="conclusion" class="form-control" type="text" v-model="conclusion"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <label class="my-custom-label">الخلاصة</label>
          </div>
        </div>
        <!-- صورة -->
        <div class="input-group">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                اضافة صور
              </v-expansion-panel-header>
              <v-expansion-panel-content style="z-index: 10">
                <div class="row">
                  <div class="col-lg-6 col-sm-4 col-sm-offset-2" align="center">
                    <div class="form-group">
                      <div class="inputGroupContainer">
                        <uploadImage />
                      </div>
                    </div>
                  </div>

                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <!-- Button -->
        <div class="form-group">
          <label class="col-md-4 control-label"></label>
          <div class="col-md-4">
            <button @click.prevent="addNewIncoming()" class="btn btn-warning">حفظ <span
                class="glyphicon glyphicon-save"></span></button>
          </div>
        </div>

      </fieldset>
    </form>
  </div>
  <!-- /.container -->
</template>
<script>
import Dropdown from 'vue-simple-search-dropdown';
import { mapActions, mapMutations, mapGetters } from 'vuex';
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;
import datePicker from 'vue-bootstrap-datetimepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import uploadImage from './multipleImagesUpload/uploadImage.vue';

export default {
  data() {
    return {
      sendersName: [{ id: '11ddd', name: 'Sam' }, { id: 2, name: 'Ali' }, { id: 1, name: 'Kamil' }],
      conclusion: null,
      result: null,
      senderId: null,
      messageNumber: null,
      serialNumber: null,
      date: new Date(),
      selected: null,
      aaa: null
    }
  },
  computed: {
    ...mapGetters({
      getImage: 'getImage'
    })
  },
  methods: {
    ...mapActions({
      'addNewMessage': 'addNewMessage',
      'getSendersListInIncoming': 'getSendersList'
    }),
    ...mapMutations({
            setImageM: 'setImageM'
        }),
    validateSelection(selection) {
      this.selected = selection;
      console.log(selection.name + " has been selected", selection.id);
      this.senderId = selection.id;
      console.log(selection.name + " had been selected", this.senderId);
      // console.log('aaa' + " selected", this.aaa);

    },

    getDropdownValues(keyword) {
      console.log("You could refresh options by querying the API with " + keyword);
    },
    addNewIncoming() {
      if (!this.conclusion && !this.messageNumber && !this.serialNumber && !this.date && !this.senderId && !this.result) {
        return;
      }
      this.addNewMessage({
        serialNumber: this.serialNumber,
        senderId: this.senderId,
        messageNumber: this.messageNumber,
        conclusion: this.conclusion,
        date: this.date,
        result: this.result,
        images: this.getImage
      });
      this.setImageM(null);
    },
  },
  async created() {
    const result = await this.getSendersListInIncoming();
    const sendersNameList = result.senders
    sendersNameList.forEach((obj) => {
      obj.id = obj._id;
      delete obj._id
    })
    this.sendersName = sendersNameList
    console.log('senders cc: ', this.sendersName)
    
  },
  components: {
    'date-picker': datePicker,
    Dropdown,
    uploadImage
  }
}
</script>

<style lang="css" scoped src="./bootstrapstyle/min.css">
.dropdown .dropdown-input[data-v-6149e08a] {
  max-width: 1000px !important;
  width: 700px !important;
  min-width: 1000px !important;
}
</style>