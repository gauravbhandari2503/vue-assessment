<template>
  <div class=" d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" @click="goToPage(1)" :disabled="currentPage === 1">&#60;&#60;</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="previousPage" :disabled="currentPage === 1">&#60;</a>
      </li>
      <li class="page-item">
        <span class="page-link" v-if="currentPage >= 4 && totalPages !== 4 || (currentPage === 3 && totalPages === 5)" :disabled="true">&#8230;</span>
      </li>
      <li class="page-item" v-for="pageNumber in visiblePages" :key="pageNumber">
        <a class="page-link" @click="goToPage(pageNumber)" :class="{active: currentPage === pageNumber}">
          {{ pageNumber }}
        </a>
      </li>
      <li class="page-item">
        <span class="page-link" v-if="pageOptions" :disabled="true">&#8230;</span>
      </li>
      <li class="page-item">
        <a class="page-link" @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0">&#62;</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="goToPage(totalPages)" :disabled="currentPage === totalPages || totalPages === 0">&#62;&#62;</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomPagination',
  props: {
    totalRows: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  emits: ['page-changed'],
  data() {
    return {
      visiblePageCount: 4,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalRows / this.perPage);
    },
    visiblePages() {
      let maxVisiblePages = Math.min(this.visiblePageCount, this.totalPages);
      let startPage;
      let endPage;
      if (this.currentPage >= 4) {
        maxVisiblePages = 3;
        startPage = this.currentPage - 1;
        endPage = this.currentPage + 1;
      } else {
        startPage = 1;
        endPage = Math.min(maxVisiblePages, this.totalPages);
      }
      if (this.currentPage === this.totalPages) {
        startPage = Math.max(this.currentPage - maxVisiblePages, 1);
        endPage = this.currentPage;
      }
      if (this.totalPages - this.currentPage < 3) {
        startPage = Math.max(this.totalPages - 3, 1);
        endPage = this.totalPages;
      }
      if (this.currentPage === 4 && this.totalPages === 4) {
        startPage = 1;
        endPage = this.totalPages;
      }
      if (this.totalPages === 0) {
        startPage = 1;
        endPage = 1;
      }
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    pageOptions() {
      let displayMorePageOption = true;
      if (this.currentPage === this.totalPages || this.totalPages <= 4 || this.totalPages - this.currentPage < 3) {
        displayMorePageOption = false;
      }
      return displayMorePageOption;
    },
  },
  methods: {
    goToPage(pageNumber) {
      if (pageNumber !== this.currentPage) {
        this.$emit('page-changed', pageNumber);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('page-changed', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-changed', this.currentPage + 1);
      }
    },
  },
};
</script>

<style scoped>

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: white;
}

a.page-link[disabled="true"] {
  cursor: not-allowed;
  color: #999;
}

a.page-link[disabled="true"]:hover {
  cursor: not-allowed; /* Change cursor on hover for disabled links */
}

a.page-link[disabled="false"] {
  cursor: pointer;
}

a.page-link[disabled="false"]:hover {
  cursor: pointer; /* Change cursor on hover for disabled links */
}
</style>
