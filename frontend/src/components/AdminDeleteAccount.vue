<template>
  <div>
    <DeleteAccount @onDeleteAccount="confirmDeletion" />
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import DeleteAccount from '../components/DeleteAccount'

export default {
  name: 'UserDeleteAccount',
  components: {
    DeleteAccount
  },
  props: ['userProfile'],

  methods: {
    async confirmDeletion () {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
        await apiClient.delete(`api/users/${this.userProfile.id}`)
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss"></style>
