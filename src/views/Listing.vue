<template>
  <button v-if="!isLoading" type="button" class="btn btn-info my-1 mx-1 text-white" @click="() => $router.push('/')">Visit to Dynamic Form</button>
  <vue-element-loading :active="isLoading" is-full-screen />
  <div class="container listing" v-if="!isLoading">
    <h1 class="list-heading my-4">User Listing</h1>
    <div class="list-filter d-flex align-items-center mb-4">
      <label>Search By</label>
      <select  class="form-select" v-model="selectedFilter" @change.prevent="updatedFilter">
        <option :key="item.id" v-for="item in categories" :value="item.id">
          {{ item.category }}
        </option>
      </select>
      <input class="form-control" type="text" :placeholder="searchByPlaceholder()" v-model="searchQuery" @input="debounceSearch" />
    </div>
    <div class="list-table">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredUsers.length">
            <tr v-for="(user) in filteredUsers" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ getUserAddress(user.address) }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.website }}</td>
              <td>{{ getUserCompany(user.company) }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7" class="text-center fs-5">
                No Data Found
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <Pagination
        v-if="filteredUsers.length"
        :perPage="5"
        :totalRows="totalRecords"
        :currentPage="pageNumber"
        @page-changed="changePage"
      />
    </div>
  </div>
</template>

<script>
// Using options API
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Pagination from '../components/PaginationComponent.vue'
import { debounce } from 'lodash'

export default {
  name: 'UserListing',
  setup() {
    const isLoading = ref(false)
    const store = useStore()
    const selectedFilter = ref('all')
    const searchQuery = ref('')
    onMounted(async () => {
      // Set loading state to true while waiting for the API response
      isLoading.value = true
      try {
        // Dispatch your async action
        await store.dispatch('users/fetchUsers')

        // Set loading state to false when the API request is completed
      } catch (error) {
        console.error('Error:', error)
        // Handle error if necessary
      } finally {
        isLoading.value = false
      }
    })
    return {
      store,
      isLoading,
      searchQuery,
      selectedFilter
    }
  },
  components: {
    Pagination
  },
  computed: {
    filteredUsers() {
      return this.store.getters['users/getPaginatedData']
    },
    pageNumber() {
      return this.store.state.users.pagination.currentPage
    },
    totalRecords() {
      return this.store.getters['users/getTotalRecords']
    },
    categories() {
      return this.store.getters['users/getSearchByCategories']
    }
  },
  methods: {
    changePage(pageNumber) {
      this.store.dispatch('users/changePageNumber', pageNumber)
    },
    getUserAddress(address) {
      return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`
    },
    getUserCompany(company) {
      return `${company.name}, ${company.catchPhrase}, ${company.bs}`
    },
    debounceSearch() {
      this.getSearchedData()
    },
    getSearchedData: debounce(function () {
      const query = this.searchQuery.toLowerCase().trim()
      this.store.dispatch('users/changeSearchQuery', { searchQuery: query, selectedFilter: this.selectedFilter})
    }, 300),
    searchByPlaceholder() {
      const placeholder = this.categories.find(item => item.id === this.selectedFilter);
      if (placeholder) return `Search By ${placeholder.category}`
      return 'Search';
    },
    updatedFilter() {
      this.searchQuery = '';
      this.store.dispatch('users/changeSearchQuery', { searchQuery: this.searchQuery, selectedFilter: this.selectedFilter });
    }
  }
}
</script>
<style scoped>

.list-filter {
  gap: 30px;
 }
.list-filter label{
  min-width: 75px;
}
.list-filter select, .list-filter input {
  max-width: 300px;
}

.list-heading{
  text-align: center;
  margin: 0;
}
</style>