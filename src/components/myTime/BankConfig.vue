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
                @delet="confirmDeleteAccount"
                v-for="(account, i) in accounts" :key="i" />
            <Modal
                v-if="showModal" 
                @close="showModal = false" 
                @save="save"/>
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
            'resetAccountSelected',
            'newAccount',
            'deleteAccount'
        ]),
        modal () {
            if (this.accountSelected) {
                this.resetAccount()
                return
            }
            this.showModal = !this.showModal
        },
        edit (account) {
            console.log('edit', account)
            this.showModal = true
            this.selectAccount({ account })
        },
        resetAccount() {
            this.modal = false
            this.resetAccountSelected()
        },
        confirmDeleteAccount (account) {
            const confirmar = window.confirm(`Deseja deletar a conta "${account.name}"?`)
            if (confirmar) {
               this.deleteAccount({ account })
            }
        },
        async save (event) {
            switch (event.chooise) {
                case 'new':
                    await this.newAccount({ account: event.account})
                    this.showModal = false
                    break;
            
                case 'edit':
                    await this.editAccount({ account: event.account})
                    this.showModal = false
                    break;
            }
            this.resetAccount()
        }
    }

}
</script>

<style>


</style>