<template>
  <button type="button" class="btn btn-info my-1 mx-1 text-white" @click="() => $router.push('/listing')">Visit to User Listing</button>
  <div class="container">
    <h1 class="text-center my-5">Dynamic Form</h1>
    <!-- Form can handle number of fields -->
    <div class="dynamic-form-container shadow p-5 rounded-4 mx-auto">
      <div class="dynamic-form row gy-2">
        <template v-for="form in dynamicForm" :key="form.token">
          <InputCheckboxTemplate
            v-if="form.type === 'checkbox'"
            :form-data="form"
            :model-value="requestForm[form.token]"
            @update:model-value="(newValue) => (requestForm[form.token] = newValue)"
            :form-error="formErrors.has(`${form.token}`) ? formErrors.first(`${form.token}`) : ''"
            @clear-form-error="formErrors.clear(`${form.token}`)"
          />
          <InputDateTemplate
            v-if="form.type === 'date'"
            :form-data="form"
            :model-value="requestForm[form.token]"
            @update:model-value="(newValue) => (requestForm[form.token] = newValue)"
            :form-error="formErrors.has(`${form.token}`) ? formErrors.first(`${form.token}`) : ''"
            @clear-form-error="formErrors.clear(`${form.token}`)"
          />
          <InputTextTemplate
            v-if="form.type === 'text'"
            :form-data="form"
            :model-value="requestForm[form.token]"
            @update:model-value="(newValue) => (requestForm[form.token] = newValue)"
            :form-error="formErrors.has(`${form.token}`) ? formErrors.first(`${form.token}`) : ''"
            @clear-form-error="formErrors.clear(`${form.token}`)"
          />
        </template>
      </div>
      <div>
        <button type="submit" class="btn btn-primary mt-4" @click="submitForm">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Using compostion API
import InputCheckboxTemplate from '@/components/form-template/InputCheckboxTemplate.vue'
import InputDateTemplate from '@/components/form-template/InputDateTemplate.vue'
import InputTextTemplate from '@/components/form-template/InputTextTemplate.vue'
import { response } from '@/services/dynamic-form'
import { ref } from 'vue'
import FormErrors from '@/services/error'

// can call API as task provided the JSON so using it.
function getFormInitials() {
  const obj = {}
  dynamicForm.forEach((form) => {
    obj[`${form.token}`] = form.props.hasOwnProperty('default') ? form.props.default : ''
  })
  return obj
}
const dynamicForm = response.blocks
let requestForm = ref(getFormInitials())
let formErrors = ref(new FormErrors())

function validateForm() {
  let validated = true
  dynamicForm.forEach((form) => {
    if (
      form.props.hasOwnProperty('required') &&
      form.props.required &&
      !requestForm.value[`${form.token}`]
    ) {
      validated = false
      formErrors.value.set(`${form.token}`, `${form.token} is a required field`)
    }
  })
  return validated
}

function submitForm() {
  // Check if the form has errors or not
  if (validateForm()) {
    alert('form validated successfully')
    // Form is validated and call the API's to send the data
  }
}
</script>
<style>
.dynamic-form-container {
  max-width: 550px !important;
}
.dynamic-form {
  max-height: 60vh;
  overflow: auto;
}
</style>
