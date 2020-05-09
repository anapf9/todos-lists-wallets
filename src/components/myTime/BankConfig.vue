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
                v-for="card in cards" :key="card" />
            <Modal
                v-if="showModal" 
                @close="showModal = false" />
        </div>
    </div>
</template>

<script>
import Card from './Card'
import Modal from './Modal'
export default {
    name: 'BankConfig',
    components: {
        Card,
        Modal
    },
    data: () => ({
        cards: 3,
        showModal: false
    }),
    methods: {
        modal () {
            console.log('toquei')
            this.showModal = !this.showModal
        }
    }

}
</script>

<style>


</style>