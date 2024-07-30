export const useErrorStore = defineStore({
  id: 'error',
  state: () => ({
    errors: null,
    formId: null,
  }),
  actions: {
    setFormId(formId: any) {
      this.formId = formId
    },
    updateErrors(errors: any) {
      this.errors = errors
    },
  },
})
