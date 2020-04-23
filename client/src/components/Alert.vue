<template>
  <b-alert
    variant="danger"
    dismissible
    fade
    :show="showDismissibleAlert"
    @dismissed="showDismissibleAlert=false"
  >
    Dismissible Alert!
  </b-alert>
</template>

<script>
export default {
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>
