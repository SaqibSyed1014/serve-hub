import { useErrorStore } from "~/segments/error"

const CSRF_COOKIE = 'XSRF-TOKEN'
const CSRF_HEADER = 'X-XSRF-TOKEN'
const ACCESS_TOKEN = 'ACCESS-TOKEN'

export const usePayloadUrl = () => {
  const config = useRuntimeConfig()
  let url, baseURL, appUrl
  if (process.server) {
    url = config.API_URL
    baseURL = `${url}`
  }
  else {
    url = config.public.API_URL
    baseURL = `${url}`
  }
  return { url, baseURL, appUrl }
}

// export const initCsrf = async () => {
//   const { url } = usePayloadUrl()
//   await $fetch.raw(`${url}/sanctum/csrf-cookie`, {
//     credentials: 'include',
//   })
// }

export const useFetchData: any = async (url = '/', options: any = {}) => {
  // const token: any = useCookie(CSRF_COOKIE).value
  // let accessToken: any = useCookie(ACCESS_TOKEN).value
  // if (options.accessToken) {
  //   accessToken = options.accessToken
  // }
  const { baseURL, appUrl } = usePayloadUrl()

  let headers: any = {
    'X-TYPESENSE-API-KEY': '3bxhPnXQCcA2Ubg5jYOJu0IbFoEnU7Fq',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*", 
    'Access-Control-Allow-Headers': '*',
    ...options?.headers,
    // ...(token && { [CSRF_HEADER]: token }),
  }

  if (process.server) {
    headers = {
      ...headers,
      // ...useRequestHeaders(['cookie']),
      referer: appUrl,
    }
  }
  // if (accessToken) {
  //   headers['Authorization'] = `Bearer ${accessToken}`
  // }

  try {
    const errorStore = useErrorStore()

    const response: any = await $fetch(url, {
      baseURL,
      headers,
      credentials: 'include',
      async onResponse({ response }:any) {
        if (response._data.success && response._data.message) {
          errorStore.updateErrors(null)
          useNuxtApp().$toast?.success(response._data.message)
        }
        return true
      },
      async onResponseError({ response }:any) {
        if (!response.ok) {
          switch (response.status) {
            case 422:
              if (response._data.errors) {
                errorStore.updateErrors(response._data.errors)
                if (response._data.message) {
                  useNuxtApp().$toast?.error(`${response._data.message}`)
                }
              } else if(response._data.message) {
                useNuxtApp().$toast?.error(`${response._data.message}`)
              }
              break
            case 419:
              break
            default:
              if (response._data.message)
                useNuxtApp().$toast?.error(response._data.message)
              break
          }
        }
        return true
      },
      ...options,
    })

    if (response?.data
      && ((Array.isArray(response?.data) && response?.data.length) || !(Array.isArray(response?.data)))
      && options.all === undefined
      && !response?.meta && !response.current_page)
      return response.data

    return response
  }
  catch (error:any) {
    switch (error?.response?.status) {
      case 419:
        // await initCsrf()
        if (options.csrfRetry >= 3) {
          useNuxtApp().$toast?.error('Something went wrong! Please refresh the page and try again')
        }
        else {
          if (!options.csrfRetry)
            options.csrfRetry = 1
          else
            options.csrfRetry++

          return useFetchData(url, options)
        }
        break

      default:
        return { error, data: error?.response?._data, status: error?.response?.status }
        break
    }
  }
}

export const useGet = async (url = '/', options = {}) => {
  return await useFetchData(url, {
    method: 'GET',
    ...options,
  })
}

export const usePost = async (url = '/', options = {}) => {
  return await useFetchData(url, {
    method: 'POST',
    ...options,
  })
}

export const usePut = async (url = '/', options = {}) => {
  return await useFetchData(url, {
    method: 'PUT',
    ...options,
  })
}

export const useDelete = async (url = '/', options = {}) => {
  return await useFetchData(url, {
    method: 'DELETE',
    ...options,
  })
}
