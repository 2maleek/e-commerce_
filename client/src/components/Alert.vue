<template>
    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showDismissibleAlert"
      @dismissed="dismissed"
    >
      Dismissible Alert! {{ message }}
    </b-alert>
</template>

<script>
export default {
  props: ['status', 'message'],
  data() {
    return {
      dismissSecs: 5,
      showDismissibleAlert: status
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    dismissed() {
      this.$emit('dismissed')
    }
  }
}
</script>
