<template>
    <div class="container mt-2">
        <div class=row>
            <div class="col-1 d-flex justify-content-between mb-3">
                <font-awesome-icon icon="award" style="color:gold"/>
                <font-awesome-icon icon="poo" style="color:brown" spin/>
            </div>
        </div>
        <div class=row>
            <div class=col-6>
                <div v-for="x in 15" :key="x - 1" class="row mb-1">
                    <div class="col-2 d-flex justify-content-between">
                        <input type="radio" v-model="newgame.mvp" :value="x - 1">
                        <input type="radio" v-model="newgame.lvp" :value="x - 1">
                    </div>
                    <input class="mr-2" v-model="newgame.players[x - 1]" placeholder="Player Username">
                    <v-select select :clearable="false" v-model="newgame.roles[x - 1]" :options="possibleroles"/>
                </div>
            </div>
            <div class=col-6>
                <picture-input
                    ref="pictureInput"
                    @change="onChanged"
                    :width="650"
                    :removable="false"
                    removeButtonClass="ui red button"
                    :height="600"
                    accept="image/jpeg, image/png, image/gif"
                    buttonClass="ui button primary"
                    :customStrings="{
                    upload: '<h1>Upload it!</h1>',
                    drag: 'Drop Game Screenshot Here'}">
                </picture-input>
            </div>
        </div>

        <div class=row>
            <div class="col-6 d-flex justify-content-between">
                <div>
                    <label class=mr-2> Winner :</label>
                    <select v-model="newgame.game.winner">
                        <option> TOWN </option>
                        <option> MAFIA </option>
                        <option>  NK </option>
                        <option> DRAW </option>
                    </select>
                </div>
                <div>
                    <label class=mr-2> NE Win? </label>
                    <select v-model="newgame.game.neWin">
                        <option> true </option>
                        <option> false </option>
                    </select>
                </div>
                <div>
                <input v-model="newgame.game.yturl" placeholder="www.youtube.com/?????">
                </div>
            </div>
        </div>

        <button @click="onSubmit()" type="button" class="btn btn-primary mt-2"> SUBMIT </button>
    </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import vSelect from 'vue-select' 
import AWS from 'aws-sdk'

export default {
  name: 'upload',
  data() {
    return {
        newgame: {
            game: {
                winner: "TOWN",
                neWin: false,
                yturl: ""
            },
            mvp: 0,
            lvp: 0,
            players: [],
            roles: []
        },
        possibleroles: [ "Jailor", "Sheriff", "Investigator", "Lookout", "Spy", "Vigilante", "Veteran", "Bodyguard", "Doctor", "Escort", "Mayor", "Medium", "Retributionist", "Transporter", "Godfather",  "Mafioso", "Disguiser", 
            "Forger",  "Framer",  "Janitor",  "Blackmailer",  "Consigliere",  "Consort",  "Jester",  "Witch",  "Executioner",  "Arsonist",  "Werewolf",  "Serial Killer"],
    }
  },
  components: {
    PictureInput,
    vSelect
  },
  methods: {
      uploadToS3(image) {
        var bucket = new AWS.S3({params: {Bucket: 'peanutland'}});
        var imageFile = {Key: "gameresult", ContentType: image.type, Body: image};
        bucket.upload(imageFile, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });
      },
      onChanged(image) {
          this.uploadToS3(image);
          var params = {
              Document: {
                  S3Object: {
                      Bucket: 'peanutland',
                      Name: 'gameresult.png"'
                  }
              }
          }
          var textract = new AWS.Textract();
            textract.detectDocumentText(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
            });

      },
      onRemoved() {

      },
      async onSubmit() {
          console.log(this.newgame);
          const response = await fetch(`${process.env.VUE_APP_API_URL}games`, {
                method: 'POST',
                body: JSON.stringify(this.newgame),
                headers: {
                    'content-type': 'application/json'
                }
            })
            console.log(response);
      }
  }
}
</script>

<style lang="scss">
    $vs-colors: (
            lightest: #DCDCDC,
            light: #D3D3D3,
            dark: #C0C0C0,
            darkest: #A9A9A9,
    );

    @import "vue-select/src/scss/vue-select.scss";

  .vs__dropdown-menu {
    background: #dfe5fb;
    border: none;
    color: #394066;
    text-transform: lowercase;
    font-variant: small-caps;
  }

    input[type="radio"] {
    margin-top: -1px;
    height: 100%;
    vertical-align: middle;
    }

</style>