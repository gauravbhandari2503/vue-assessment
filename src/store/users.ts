/* eslint-disable no-prototype-builtins */
import UsersService from '../services/users.service'
import { type User } from '../interfaces/User'
import { type Pagination } from '../interfaces/Pagination'
import { type RootState } from '../interfaces/RootState'
import { type RootGetters } from '@/interfaces/RootGetters'

function filterLogic(user: User, key: string, searchQuery: string): Boolean {
  if (user.hasOwnProperty(key)) {
    let cellValue = ''
    if (typeof user[key] === 'object') {
      for (const attribute in user[key]) {
        if (user[key].hasOwnProperty(attribute)) {
          cellValue = user[key][attribute].toString().toLowerCase()
          if (cellValue.includes(searchQuery)) {
            return true
          }
        }
      }
    } else {
      cellValue = user[key].toString().toLowerCase()
      if (cellValue.includes(searchQuery)) {
        return true
      }
    }
  }
  return false
}

const state = {
  users: [] as User[],
  searchQuery: '' as string,
  pagination: {
    totalRows: 5,
    currentPage: 1,
    perPage: 5
  } as Pagination,
  searchByFilter: 'all'
}

const getters = {
  getFilteredData: (state: RootState) => {
    // searchQuery and filter
    let filteredData = state.users
    if (state.searchQuery.length) {
      if (state.searchByFilter === 'all') {
        filteredData = state.users.filter((user) => {
          for (const key in user) {
            if (key !== 'id' && filterLogic(user, key, state.searchQuery)) {
              return true
            }
          }
          return false
        })
      } else {
        filteredData = state.users.filter((user) => {
          return filterLogic(user, state.searchByFilter, state.searchQuery)
        })
      }
    }
    return filteredData
  },
  getPaginatedData: (state: RootState, getters: RootGetters) => {
    const paginatedUsers = []
    const filteredData = getters.getFilteredData
    if (filteredData.length) {
      const to = state.pagination.currentPage * state.pagination.totalRows
      const from = to - state.pagination.totalRows
      for (let i = from; i <= to - 1; i++) {
        if (filteredData[i]) paginatedUsers.push(filteredData[i])
      }
    }
    return paginatedUsers
  },
  getTotalRecords: (state: RootState, getters: RootGetters) => {
    return getters.getFilteredData.length
  },
  getSearchByCategories: (state: RootState) => {
    if (state.users.length) {
      const categories: any = [
        {
          id: 'all',
          category: 'All Categories'
        }
      ]
      for (const key in state.users[0]) {
        if (key !== 'id')
          categories.push({ id: key, category: key.charAt(0).toUpperCase() + key.slice(1) })
      }
      return categories
    }
    return []
  }
}

const mutations = {
  setUsers: (state: RootState, users: User[]) => {
    state.users = users
  },
  setPageNumber: (state: RootState, pageNumber: number) => {
    state.pagination.currentPage = pageNumber
  },
  setSearchQuery: (state: RootState, filters: any) => {
    state.searchQuery = filters.searchQuery
    state.searchByFilter = filters.selectedFilter
  }
}

const actions = {
  async fetchUsers({ commit }: { commit: Function }) {
    try {
      const users = await UsersService.getUsers()
      commit('setUsers', users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  },
  changePageNumber({ commit }: { commit: Function }, pageNumber: number) {
    commit('setPageNumber', pageNumber)
  },
  changeSearchQuery({ commit }: { commit: Function }, filters: any) {
    commit('setSearchQuery', filters)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
