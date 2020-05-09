<template>
    <div>
        <Button class="mt-3 float-right" />
        <div class="d-flex flex-wrap my-3 ">
            <Card 
                v-for="card in cards" :key="card" />
            <Modal />
        </div>
    </div>
</template>

<script>
import Button from './Button'
import Card from './Card'
import Modal from './Modal'
export default {
    name: 'BankConfig',
    components: {
        Button,
        Card,
        Modal
    },
    data: () => ({
        cards: 3
    })

}
</script>

<style>

</style>