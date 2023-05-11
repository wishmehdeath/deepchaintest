<template>
  <div>
    <h2>Call Details</h2>
    <p>ID: {{ call.id }}</p>
    <p>Direction: {{ call.direction }}</p>
    <p>From: {{ call.from }}</p>
    <p>To: {{ call.to }}</p>
    <p>Duration: {{ call.duration }}</p>
    <p>Status: {{ call.is_archived ? 'Archive' : 'Unarchive' }}</p>
    <p>Call Type: {{ call.call_type }}</p>
    <p>Via: {{ call.via }}</p>
    <p>Created At: {{ call.created_at }}</p>
  </div>
</template>

<script>
import api from '@/api/api.js';

export default {
  data() {
    return {
      call: {}
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const response = await api.get(`/calls/${id}`);
    this.call = response.data;
  }
};
</script>
