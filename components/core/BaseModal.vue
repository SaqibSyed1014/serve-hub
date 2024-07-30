<script setup lang="ts">
const props = withDefaults(defineProps<{
  id?: string
  title: string
  width?: string
  canDismiss?: boolean
  okText?: string,
  cancelText?: string
  okDisabled?: boolean
  loadingOkBtn?: boolean
  onCancel?: () => void
  onOk?: () => Promise<any>
  hideOkBtn?: boolean
  hideCancelBtn?: boolean
}>(), {
  id: 'base-modal',
  width: '672px',
  canDismiss: true,
  okText: 'Ok',
  loadingOkBtn: false,
  cancelText: 'Cancel',
  okDisabled: false,
  hideOkBtn: false,
  hideCancelBtn: false
})

const emit = defineEmits(['close'])

const model = defineModel()
const dismiss = () => {
  if (props.canDismiss) {
    emit('close', false)
  }
}

const onSubmit = async () => {
  if (props.onOk) {
    await props.onOk().then(
        (val: any) => {
          emit('close', val)
        },
    )
  }
}

const cancel = () => {
  if (props.onCancel) {
    props.onCancel()
  }
  emit('close', false)
}
</script>

<template>
    <div
        v-if="model"
        :id="id"
        tabindex="-1"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed bg-black/60 top-0 right-0 left-0 bottom-0 z-[1111] w-full md:inset-0 h-screen max-h-full"
        @click.self="dismiss"
    >
        <div class="relative p-4 w-full max-w-2xl max-h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" :style="{ maxWidth: props.width }">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ title }}
              </h3>
              <button @click="cancel" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
              <slot name="body" />
            </div>
            <!-- Modal footer -->
            <div class="flex items-center justify-center gap-3 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <BaseButton v-if="!hideCancelBtn" color="gray" :outline="true" :label="cancelText" @click="cancel" />
              <BaseButton v-if="!hideOkBtn" :label="okText" :is-loading="loadingOkBtn" :disabled="okDisabled" @click="onSubmit" />
            </div>
          </div>
        </div>
    </div>
</template>
