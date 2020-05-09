<template>
    <div class="card text-white bg-dark shadow p-3 mx-2 my-2 rounded" style="min-width: 230px; max-width: 250px;">
        <div class="card-header">
            <i class="far fa-credit-card"></i>
            Header
        </div>
        <div class="card-body">
            <h5 class="card-title font-weight-bolder text-center">Dark card title</h5>
            <p class="card-text text-muted text-center">subtitle.</p>
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
export default {

}
</script>

<style>

</style>