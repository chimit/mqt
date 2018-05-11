<template>
  <section class="section">
    <div class="field has-addons">
      <div class="control">
        <button v-on:click="disconnect" class="button is-small is-danger is-outlined">
          <span class="icon is-small">
            <i class="fas fa-plug"></i>
          </span>
          <span>Disconnect</span>
        </button>
      </div>
      <div class="control">
        <button v-on:click="disconnectUngracefully" class="button is-small is-danger is-outlined">
          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
          <span>Disconnect ungracefully</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  const mqtt = require('mqtt')

  export default {
    data () {
      return {
        client: null
      }
    },

    methods: {
      disconnect () {
        this.client.end()

        this.$router.push('/')
      },

      disconnectUngracefully () {
        this.client.stream.destroy()
        this.client.end()

        this.$router.push('/')
      }
    },

    mounted () {
      let config = {
        clientId: this.$store.state.Credentials.credentials.clientId,
        username: this.$store.state.Credentials.credentials.username,
        password: this.$store.state.Credentials.credentials.password,
        will: this.$store.state.Credentials.credentials.lwTopic ? {
          topic: this.$store.state.Credentials.credentials.lwTopic,
          payload: this.$store.state.Credentials.credentials.lwMessage,
          qos: this.$store.state.Credentials.credentials.lwQos,
          retain: this.$store.state.Credentials.credentials.lwRetain
        } : null
      }

      this.client = mqtt.connect(this.$store.state.Credentials.credentials.protocol + this.$store.state.Credentials.credentials.hostname, config)

      this.client.on('connect', function () {
        console.log('Connected')
      })

      this.client.on('close', function () {
        console.log('Disconnected')
      })
    }
  }
</script>
