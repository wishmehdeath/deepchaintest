
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit"  class="btn btn-primary">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password
        });
        
        localStorage.setItem('token',response.data.access_token)
        console.log(response.data);
        // Redirect to the data grid page
        this.$router.push('/datagrid');

      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>
/* Your component's CSS code here */
@import '@/assets/main.css';
</style>