<template>
  <div>
    <label class="form-label" :for="formData.token">{{ formData.props.title }} </label>
    <input class="form-control date-input" :id="formData.token" type="date" :value="modelValue" @input="onInput($event)"/>
    <span v-if="formError.length" class="text-danger">
      {{ formError }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String, Date],
    required: true
  },
  formError: {
    type: String,
    required: false,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'clear-form-error'])

function onInput(event) {
  emit('clear-form-error')
  emit('update:modelValue', event.target.value)
}
</script>
<style>
</style>
