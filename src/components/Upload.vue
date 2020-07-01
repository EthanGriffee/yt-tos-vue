<template>
    <div class="container mt-2">
        <div class=row>
            <div class=col-6>
                <div v-for="x in 15" :key="x" class="row mb-1">
                    <input class="mr-2" v-model="newgame.players[x]" placeholder="Player Username">
                    <v-select select v-model="newgame.roles[x]" :options="possibleroles">
                    </v-select>
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
            <select v-model="newgame.winner">
                <option> Town </option>
                <option> Mafia </option>
                <option> Neutral Killing </option>
                <option> Tie </option>
            </select>
            <select v-model="newgame.newin">
                <option> TRUE </option>
                <option> FALSE </option>
            </select>
            <input v-model="newgame.yturl" placeholder="www.youtube.com/?????">
        </div>

        <button type="button" class="btn btn-primary"> SUBMIT </button>
    </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import vSelect from 'vue-select' 

export default {
  name: 'upload',
  data() {
    return {
        newgame: {
            players: [],
            roles: [],
            winner: "",
            newin: false,
            yturl: ""
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
      onChanged() {

      },
      onRemoved() {

      },
      async onSubmit() {
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

</style>