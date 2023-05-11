<template>
  <div v-if="showModal">
    <div class="modal-content">
      <h2>Add Note to Call</h2>
      <form @submit.prevent="submitNote">
        <label>
          Note:
          <textarea v-model="note"></textarea>
        </label>
        <button type="submit">Add Note</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js';
import Pusher from 'pusher-js';

export default {
  props: {
    callId: {
      type: String,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      note: '',
      notes: []
    };
  },
  methods: {
    async submitNote() {
      // Call the API to add the note to the call
      const response = await api.post(`/calls/${this.callId}/note`, { content: this.note });

      // Display success message
      if (response.status === 201) {
        alert('Note added successfully');
      }

      // Close the modal
      this.onClose();
    }
  },
  created() {
  // Subscribe to the Pusher channel for real-time updates
  const pusher = new Pusher('d44e3d910d38a928e0be', {
    cluster: 'eu',
    encrypted: true,
    authEndpoint: 'https://frontend-test-api.aircall.io/pusher/auth'
  });
  const channel = pusher.subscribe(`calls-${this.callId}`);
  channel.bind('note-added', data => {
    // Update the UI to display the newly added note
    this.notes.push(data.note);
  });
  
  this.pusher = pusher;
},
  beforeUnmount() {
  // Unsubscribe from the Pusher channel when the component is destroyed
  this.pusher.unsubscribe(`calls-${this.callId}`);
}
};
</script>
