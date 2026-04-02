<template>
  <div class="about">
    <pdf
      v-for="i in pdfinfo['numPages']"
      :src="src"
      :page="i"
    ></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  name: "PdfFileView",
  components: {
    pdf
  },
  props: {
    src: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      numPages: 1,
      pdfinfo:{
        src: null,
        numPages:1,
      },
    }
  },
  mounted() {
    this.handelPdf()
  },
  methods: {
    async handelPdf() {
      this.pdfinfo['numPages'] = await pdf.createLoadingTask(this.src).promise.then(pdf => {
        return pdf.numPages
      })
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
