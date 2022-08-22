<template>
    <form @submit.prevent="handleSubmit()" class="house-form">
        <h3 class="text-primary">List Your House</h3>
        <div class="row">
            <label class="form-label" for="price">Price</label>
            <input class="form-control" type="number" min="1000" id="price" name="price" v-model="editable.price">

            <label class="form-label" for="img">Image</label>
            <input class="form-control" type="text" id="imgUrl" name="img" v-model="editable.imgUrl">

            <label class="form-label" for="description">Description</label>
            <textarea class="w-100 form-control" name="description" id="description" rows="5"
                v-model="editable.description"></textarea>

            <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light"
                data-bs-dismiss="modal">Submit</button>
        </div>
    </form>
</template>


<script>
import { ref, watchEffect } from "vue";
import { AppState } from '../AppState.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {

        const editable = ref({})

        watchEffect(() => {
            if (!AppState.activeHouse) { return }
            editable.value = { ...AppState.activeHouse }
        })

        return {
            editable,
            async handleSubmit() {
                try {
                    if (editable.value.id) {
                        housesService.editHouse(editable.value)
                    } else {
                        housesService.createHouse(editable.value)
                    }
                    editable.value = {}
                } catch (error) {
                    logger.error('[creating or editing house]', error)
                    Pop.error(error)
                }
            }
        }
    }
}

</script>


<style lang="scss" scoped>
</style> 
