<template>
  <section class="section">
    <div class="field has-addons">
      <p class="control has-icons-left">
        <span class="select">
          <select v-model="protocol">
            <option>mqtt://</option>
            <option>mqtts://</option>
          </select>
          <span class="icon is-small is-left">
            <i class="fas fa-server"></i>
          </span>
        </span>
      </p>
      <p class="control">
        <input v-model="hostname" class="input" type="text" placeholder="Broker hostname">
      </p>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input v-model="clientId" class="input" type="text" placeholder="Client ID">
        <span class="icon is-small is-left">
          <i class="fas fa-id-card"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input v-model="username" class="input" type="text" placeholder="User name">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input v-model="password" class="input" type="text" placeholder="Password">
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input v-model="lwTopic" class="input" type="text" placeholder="Last will topic">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input v-model="lwMessage" class="input" type="text" placeholder="Last will message">
      </div>
    </div>

    <div class="field">
      <p class="control">
        <span class="select">
          <select v-model="lwQos">
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </select>
        </span>
      </p>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="lwRetain" type="checkbox">
          Last will retain
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button v-on:click="connect" class="button is-primary">
          Connect
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
        client: null,
        protocol: 'mqtt://',
        hostname: 'broker.hivemq.com',
        clientId: '',
        username: '',
        password: '',
        lwTopic: '',
        lwMessage: '',
        lwQos: 0,
        lwRetain: false
      }
    },

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },

      connect () {
        this.client = mqtt.connect(this.protocol + this.hostname, {
          clientId: this.clientId,
          username: this.username,
          password: this.password,
          will: {
            topic: this.lwTopic,
            payload: this.lwMessage,
            qos: this.lwQos,
            retain: this.lwRetain
          }
        })

        this.client.on('connect', function () {
          console.log('Connected')
        })
      }
    }
  }
</script>
