<template>
    <div class="card text-white bg-dark shadow p-3 mx-2 my-2 rounded" style="min-width: 230px; max-width: 250px;">
            <i v-if="account.favorite" class="far fa-heart"></i>
        <div class="card-header">
            <i class="far fa-credit-card"></i>
            {{account.name}}
        </div>
        <div class="card-body">
            <h5 class="card-title font-weight-bolder text-center">
                {{ showSymbol(account.currency)}} {{ formatPrice(account.balance) }}
            </h5>
            <!-- <p class="card-text text-muted text-center">subtitle.</p> -->
            <div class="d-flex justify-content-between">
                <button 
                    class="btn btn-danger btn-sm mr-1" 
                    title="Deletar"
                    >
                        <i class="fa fa-trash"></i>
                </button>
                <button 
                    class="btn btn-primary btn-sm mr-1" 
                    title="Editar"
                    >
                        <i class="fa fa-pencil-alt"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currency from './../../currency'

export default {
    name: 'Card',
    props: {
        account: Object
    },
    data: () => ({
        currency: currency.currency
    }),
    computed: {
    },
    created() {
        // this.showSymbol()
    },
    methods: {
        formatPrice (value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },
        showSymbol (currency) {
            let show = this.currency.find(symbol => symbol.iso === currency)
            return show.symbol
        }
    }

}
</script>

<style>

</style>