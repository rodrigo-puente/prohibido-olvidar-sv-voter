<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <Tweet :id="tweetId" :key="tweetId" class="is-flex">
            <b-progress></b-progress>
          </Tweet>

          <form @submit="rateTweet">

            <div class="block">
              <p class="label">¿El Tweet describe una historia de guerra?</p>
              <b-field>
                <b-radio-button v-model="isHistory"
                    native-value=true
                    size="is-large"
                    expanded
                    type="is-success is-light is-outlined">
                    Sí (S)
                </b-radio-button>
                <b-radio-button v-model="isHistory"
                    native-value=false
                    size="is-large"
                    expanded
                    type="is-danger is-light is-outlined">
                    No (N)
                </b-radio-button>
              </b-field>
            </div>
            <b-button native-type="submit" type="is-success" size="is-large" expanded :disabled="isDisabled">Guardar (Enter)</b-button>
          </form>
          <b-button class="mt-2" type="is-text" size="is-medium" expanded @click="getNextTweet">Saltar tweet (ESC)</b-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Tweet } from 'vue-tweet-embed'

export default {
  name: 'Form',
  data() {
    return {
      tweetId: '',
      isHistory: null,
    }
  },
  components: {
    Tweet
  },
  computed: {
    isDisabled() {
      return !this.isHistory
    }
  },
  methods: {
    rateTweet(e) {
      alert(`Tweet sent. tweetId ${this.tweetId} | confidence ${this.confidence} | isHistory ${this.isHistory}. Will load a new tweet!`)
      this.getRandomTweet()
      e.preventDefault()
    },
    getRandomTweet() {
      console.log("Sacando un random tweet mediante un API")
      const randomTweets = ["1341161863103488003", "1338243989561073664", "1349556594237792256", "1349496845635100672", "1349185664240283648", "1348787778591596545"]

      this.tweetId = randomTweets[Math.random() * randomTweets.length | 0]
      this.confidence = 0
      this.isHistory = ''
    },
    doCommand(e) {
    let cmd = String.fromCharCode(e.keyCode).toLowerCase();
    if(cmd==='s'||cmd=='n'){
      //De momento no hay endopoints que enviar pero una vez este listo se agrega a las actioins para si y no
      alert(`you  pressed ${cmd}`)
    }
  }
  },
</script>

<style scoped lang="scss">
.is-flex {
  align-items: center;
}
</style>
