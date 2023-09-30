<template>
  <div>
    <label :for="formData.token" class="form-label">{{ formData.props.title }}</label>
    <input
      type="email"
      class="form-control"
      id="exampleInputEmail1"
      :placeholder="formData.props?.placeholder || ''  "
      :value="modelValue"
      @input="onInput($event)"
    />
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
    type: String,
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
