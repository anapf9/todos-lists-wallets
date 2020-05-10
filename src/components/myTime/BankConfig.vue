<template>
    <div>
        <div class="align-self-center mt-2 float-right">
            <button type="button" 
                class="btn btn-primary h-25 d-inline-block"
                @click="modal">
                <i class="fas fa-plus mr-2"></i>
                Nova Conta 
            </button>
        </div>
        <div class="d-flex flex-wrap my-3 ">
            <Card
                :account="account"
                @edit="edit"
                @delete="deleteAccount"
                v-for="(account, i) in accounts" :key="i" />
            <Modal
                v-if="showModal" 
                @close="showModal = false" />
        </div>
    </div>
</template>

<script>
import Card from './Card'
import Modal from './Modal'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('accounts')


export default {
    name: 'BankConfig',
    components: {
        Card,
        Modal
    },
    data: () => ({
        showModal: false
    }),
    computed: {
        ...mapState([
            'accounts',
            'accountSelected'
        ])
    },
    created () {
        this.getAccounts()
    },
    methods: {
        ...mapActions([
            'getAccounts',
            'editAccount',
            'selectAccount',
            'resetAccountSelected'
        ]),
        modal () {
            this.showModal = !this.showModal
        },
        edit (account) {
            this.showModal = true
            this.selectAccount({ account })
        },
        resetAccount() {
            this.modal = false
            this.resetAccountSelected()
        },
        deleteAccount () {
            console.log('deletei')
        }
    }

}
</script>

<style>


</style>