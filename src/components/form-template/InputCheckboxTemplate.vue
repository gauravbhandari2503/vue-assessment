<template>
    <div>
        <label class="form-check-label" :for="formData.token">{{formData.props.title}}</label>
        <input type="checkbox" class="form-check-input ms-1" :id="formData.token" :checked="modelValue" @change="onchange($event)" />
        <span v-if="formError.length" class="text-danger">
      {{ formError }}
    </span>
      </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Boolean],
    required: true
  },
  formError: {
    type: String,
    required: false,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'clear-form-error'])
function onchange(event) {
  emit('clear-form-error')
  emit('update:modelValue', event.target.checked)
}

</script>