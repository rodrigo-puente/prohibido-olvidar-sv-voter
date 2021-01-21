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
                    Sí
                </b-radio-button>
                <b-radio-button v-model="isHistory"
                    native-value=false
                    size="is-large"
                    expanded
                    type="is-danger is-light is-outlined">
                    No
                </b-radio-button>
              </b-field>
            </div>
            <b-button native-type="submit" type="is-success" size="is-large" expanded :disabled="isDisabled">Guardar</b-button>
          </form>
          <b-button class="mt-2" type="is-text" size="is-medium" expanded @click="getNextTweet">Saltar tweet</b-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Tweet } from 'vue-tweet-embed'
import axios from 'axios'

const api = axios.create({baseURL: "https://memoriahistorica-backend.hackerspace.sv/apis/memento"})

export default {
  name: 'Form',
  data() {
    return {
      current_tweet: null,
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
      this.current_tweet.yes_vote += (this.isHistory) ? 1 : 0;
      this.current_tweet.no_vote += (this.isHistory) ? 0 : 1;

      this.isHistory = null;
      api
        .put(
          '/'+this.current_tweet.id_pro,
          this.current_tweet
          )
        .finally(() => {
          this.getNextTweet();
        })
      e.preventDefault()
    },
    getNextTweet() {
      console.log("Sacando un random tweet mediante un API")

      api
        .get('/nextTweet')
        .then(
          response => {
            console.log(response)
            if(response.data.length>0) {
              this.current_tweet = response.data[0]
              this.tweetId = response.data[0].id.toString()
              this.isHistory = ''
            }
          }
        )
    },
    doCommand() {
    }
  }
  ,
  created() {
    console.log("API CALL PARA SACAR ")
    this.getNextTweet()
    window.addEventListener('keypress', this.doCommand);
  },
destroyed() {
  window.removeEventListener('keypress', this.doCommand);
}
};
</script>

<style scoped lang="scss">
.is-flex {
  align-items: center;
}
</style>
