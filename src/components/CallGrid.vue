<template>
<div v-if="!isLoading">
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Direction</th>
          <th>From</th>
          <th>To</th>
          <th>Duration (seconds)</th>
          <th>Status</th>
          <th>Call Type</th>
          <th>Via</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="call in paginatedCalls" :key="call.id">
        
            
            <td>{{ call.direction }}</td>
            <td>{{ call.from }}</td>
            <td>{{ call.to }}</td>
            <td>{{ call.duration }}</td>
           <td>
  <button @click="toggleArchiveCall(call.id)">
    {{ call.is_archived ? 'Unarchive' : 'Archive' }}
  </button>
</td>
            <td>{{ call.call_type }}</td>
            <td>{{ call.via }}</td>
            <td>{{ call.created_at }}</td>
            <td>
             <button @click="addNoteToCall">Add Note</button>
<note-modal
  v-if="showNoteModal"
  :call-id="call.id"
  :show-modal="showNoteModal"
  :on-close="closeNoteModal"
></note-modal>

            </td>
            <router-link :to="{ name: 'callDetails', params: { id: call.id }}">
              <button>View Details</button>
            </router-link>
           
          </tr>
        
      </tbody>
    </table>
    <div class="pagination">
      <button @click="goToPage(1)" :disabled="currentPage === 1">First</button>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
    </div>
  </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import api from '@/api/api.js';
import NoteModal from '@/components/NoteModal.vue';
export default {
  components: {
    NoteModal
  },
  data() {
    return {
      calls: [],
      currentPage: 1,
      perPage: 10,
      totalCount: 0,
      hasNextPage: false,
      offset: 0,
      isLoading: true,
      showNoteModal: false,
    };
  },
 
  computed: {
    paginatedCalls() {
  const start = (this.currentPage - 1) * this.perPage;
  const end = start + this.perPage;
  return this.calls.slice(start, end);
},
    totalPages() {
      return Math.ceil(this.totalCount / this.perPage);
    },
  },
  async created(){
    await this.fetchCalls();
  },
  
  methods: {
    async fetchCalls() {
       this.isLoading = true;
    const response = await api.get('/calls', {
      params: {
        offset: (this.currentPage - 1) * this.perPage,
        limit: this.perPage
      }
    });
    this.calls = response.data.nodes;
    this.totalCount = response.data.totalCount;
    this.hasNextPage = response.data.hasNextPage;
     this.isLoading = false;
  },
  async toggleArchiveCall(callId) {
  const call = this.calls.find(c => c.id === callId);
  const isArchived = call.is_archived;
  try {
    await api.put(`/calls/${callId}/archive`, { is_archived: !isArchived });
    call.is_archived = !isArchived;
  } catch (error) {
    console.log(error);
  }
},
   async goToPage(page) {
  this.currentPage = page;
  await this.fetchCalls();
  this.paginatedCalls = this.calls.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
},
     async addNoteToCall() {
    this.showNoteModal = true;
  },
  closeNoteModal() {
    this.showNoteModal = false;
  }
  },
};
</script>