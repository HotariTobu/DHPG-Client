import type { AxiosResponse } from "axios";

export default (res: AxiosResponse) => {
  let message = res.status + ': '

  if (res.data !== null && 'message' in res.data) {
    message += res.data.message
  }
  else {
    message += res.statusText
  }

  throw new Error(message)
}
