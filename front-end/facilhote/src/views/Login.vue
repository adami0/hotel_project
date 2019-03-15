<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-4 login-sec">
        <h2 class="text-center">Connexion</h2>
        <form class="login-form" @submit.prevent="login()">
          <div class="form-group">
            <label for="InputEmail" class="text-uppercase">Nom d'utilisateur</label>
            <input id="InputEmail" v-model="email" type="email" class="form-control">
          </div>
          <div class="form-group">
            <label for="InputPassword" class="text-uppercase">Mot de passe</label>
            <input id="InputPassword" v-model="password" type="password" class="form-control">
          </div>

          <div class="form-check">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input">
              <small>Se souvenir de moi</small>
            </label>
            <button type="submit" class="btn btn-login float-right px-5">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-md-8 banner-sec">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
              <img
                class="d-block img-fluid"
                src="https://static.pexels.com/photos/33972/pexels-photo.jpg"
                alt="First slide"
              >
              <div class="carousel-caption d-none d-md-block">
                <div class="banner-text">
                  <h2>This is Heaven</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img
                class="d-block img-fluid"
                src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg"
                alt="First slide"
              >
              <div class="carousel-caption d-none d-md-block">
                <div class="banner-text">
                  <h2>This is Heaven</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "./../event-bus.js";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("users/login", { email, password })
        .then(res => {
          EventBus.$emit("message-from-app", {
            txt: res.data.message,
            status: "alert-success"
          });
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
          EventBus.$emit("message-from-app", {
            txt: "Votre email ou mot de passe n'est pas correct :(",
            status: "alert-warning"
          });
        });
    }
  }
};
</script>

<style scoped>
.banner-sec {
  border-radius: 0 10px 10px 0;
  padding: 0;
}
.container {
  background: #fff;
  border-radius: 10px;
}
.carousel-inner {
  border-radius: 0 10px 10px 0;
}
.carousel-caption {
  text-align: left;
  left: 5%;
}
.login-sec {
  padding: 50px 30px;
  position: relative;
}
.login-sec .copy-text {
  position: absolute;
  width: 80%;
  bottom: 20px;
  font-size: 13px;
  text-align: center;
}
.login-sec h2 {
  margin-bottom: 30px;
  font-weight: 800;
  font-size: 30px;
  color: #c09a73;
}
.login-sec h2:after {
  content: " ";
  width: 100px;
  height: 5px;
  background: #feb58a;
  display: block;
  margin-top: 20px;
  border-radius: 3px;
  margin-left: auto;
  margin-right: auto;
}
.btn-login {
  background: #c09a73;
  color: #fff;
  font-weight: 600;
}
.btn-login:hover {
  background: #8d7154;
}
.banner-text {
  width: 70%;
  position: absolute;
  bottom: 40px;
  padding-left: 20px;
}
.banner-text h2 {
  color: #fff;
  font-weight: 600;
}
.banner-text h2:after {
  content: " ";
  width: 100px;
  height: 5px;
  background: #fff;
  display: block;
  margin-top: 20px;
  border-radius: 3px;
}
.banner-text p {
  color: #fff;
}
@media (max-width: 768px) {
  .banner-sec {
    border-radius: 0 0 10px 10px;
  }
  .carousel-inner {
    border-radius: 0 0 10px 10px;
  }
}
</style>
