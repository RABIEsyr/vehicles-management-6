<template>
    <VueMultiple
    @upload-success="uploadImageSuccess"
    @edit-image="editImage"
    @mark-is-primary="markIsPrimary"
    @limit-exceeded="limitExceeded"
    @before-remove="beforeRemove"
    id-upload="myIdUpload"
    id-edit="myIdEdit"
    :max-image=20
    primary-text="Default"
    browse-text="Browse picture(s)"
    drag-text="Drag pictures"
    mark-is-primary-text="Set as default"
    popup-text="This image will be displayed as default"
    :multiple=true
    :show-edit=true
    :show-delete=true
    :show-add=true
      ></VueMultiple>
</template>

<script>
import VueMultiple from 'vue-upload-multiple-image';

import { mapMutations
 } from 'vuex';
export default {
    methods: {
        ...mapMutations({
            setImageM: 'setImageM'
        }),
    uploadImageSuccess(formData, index, fileList) {
        var parsedobj = JSON.parse(JSON.stringify(fileList))
        // console.log('parsedobj',parsedobj)
        
        let onlyPath = [];
        parsedobj.forEach((obj) => {
            onlyPath.push(obj.path)
        })
        console.log('onlyPath',onlyPath)
      this.setImageM(onlyPath);
    },
    beforeRemove(index, removeCallBack) {
      console.log('index', index)
      var r = confirm("remove image")
      if (r == true) {
        removeCallBack()
      }
    },
    editImage(formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
    },
    markIsPrimary(index, fileList){
      console.log('markIsPrimary data', index, fileList)
    },
    limitExceeded(amount){
      console.log('limitExceeded data', amount)
    }
  },
    components: {
        VueMultiple
    }
}
</script>

<style></style>