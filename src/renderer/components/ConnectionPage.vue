<template>
  <section class="section">
    <div class="field has-addons">
      <div class="control has-icons-left">
        <span class="select">
          <select v-model="credentials.protocol">
            <option>mqtt://</option>
            <option>mqtts://</option>
          </select>
          <span class="icon is-small is-left">
            <i class="fas fa-server"></i>
          </span>
        </span>
      </div>
      <div class="control">
        <input v-model="credentials.hostname" class="input" type="text" placeholder="Broker hostname">
      </div>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input v-model="credentials.clientId" class="input" type="text" placeholder="Client ID">
        <span class="icon is-small is-left">
          <i class="fas fa-id-card"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input v-model="credentials.username" class="input" type="text" placeholder="User name">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input v-model="credentials.password" class="input" type="text" placeholder="Password">
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input v-model="credentials.lwTopic" class="input" type="text" placeholder="Last will topic">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input v-model="credentials.lwMessage" class="input" type="text" placeholder="Last will message">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <span class="select">
          <select v-model="credentials.lwQos">
            <option value="0">0 - At most once</option>
            <option value="1">1 - At least once</option>
            <option value="2">2 - Exactly once</option>
          </select>
        </span>
      </div>
      <p class="help">Last Will retian</p>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="credentials.lwRetain" type="checkbox">
          Last will retain
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button v-on:click="connect" v-bind:disabled="isButtonDisabled" class="button is-primary">
          Connect
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        credentials: {
          protocol: this.$store.state.Credentials.credentials.protocol || 'mqtt://',
          hostname: this.$store.state.Credentials.credentials.hostname || 'broker.hivemq.com',
          clientId: this.$store.state.Credentials.credentials.clientId || '',
          username: this.$store.state.Credentials.credentials.username || '',
          password: this.$store.state.Credentials.credentials.password || '',
          lwTopic: this.$store.state.Credentials.credentials.lwTopic || '',
          lwMessage: this.$store.state.Credentials.credentials.lwMessage || '',
          lwQos: this.$store.state.Credentials.credentials.lwQos || 0,
          lwRetain: this.$store.state.Credentials.credentials.lwRetain || false
        }
      }
    },

    computed: {
      isButtonDisabled () {
        return !this.credentials.protocol ||
          !this.credentials.hostname ||
          !this.credentials.clientId
      }
    },

    methods: {
      connect () {
        this.$store.dispatch('setCredentials', this.credentials)

        this.$router.push('main')
      }
    }
  }
</script>
