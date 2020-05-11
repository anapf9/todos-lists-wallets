<template>
    <div>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <form @submit.prevent="save">

                <div class="modal-header">
                  <slot name="header">
                    Configurações da sua Conta
                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                      <div class="form-group">
                          <label>Nome</label>
                              <input v-model="account.name" type="text" class="form-control" placeholder="Conta Teste">
                          <label for="exampleFormControlSelect1">Moeda</label>
                          <select v-model="account.currency" class="form-control" id="exampleFormControlSelect1">
                              <option v-for="(item, i) in currency" :key="i">{{item.iso}}</option>
                          </select>
                          <label>Valor</label>
                          <input v-model="account.balance" type="number" class="form-control" placeholder="R$ 1.000,00">
                          <input v-model="account.favorite" type="checkbox" class="form-check-input">
                          <label class="form-check-label"> Favorito </label> 
                      </div>
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    <button class="modal-default-button" @click="$emit('close')">
                      fechar
                    </button>
                    <button type="submit" class="modal-default-button">
                      Salvar
                    </button>
                  </slot>
                </div>

              </form>

            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import currency from './../../currency'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
    name: 'Modal',
    data: () => ({
      currency: currency.currency,
      account: {},
      today: moment().format('YYYY-MM-DD HH:MM:ss')
    }),
    computed: {
      ...mapState('accounts',[
        'accountSelected'
      ])
    },
    watch: {
      accountSelected(newSelect, oldSelect) {
        this.syncAccount(newSelect)
      }
    },
    created () {
      this.syncAccount(this.accountSelected)
      console.log(this.today)
    }, 
    methods: {
      syncAccount(newSelect) {
        this.account = Object.assign(
          {},
          newSelect || {
            name: '',
            currency: '',
            balance: '',
            favorite: '',
            modification_time: this.today
          }
        )
      },
      save (event) {
        let chooise = !this.accountSelected ? 'new' : 'edit'
        this.$emit('save', { chooise, account: this.account})
      }
    }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>