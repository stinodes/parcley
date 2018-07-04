// @flow
import {MessageBarManager} from 'react-native-message-bar'

type Config = {
  message?: string,
  title?: string,
  duration?: number,
  image?: number|string,
  alertType?: 'success'|'warning'|'error'|'info'|'custom',
}

const createMessage = ({...config}: Config) => {
  MessageBarManager.showAlert({
    ...config,
  })
}
const createError = (config: Config) => createMessage({...config, alertType: 'error'})
const createSuccess = (config: Config) => createMessage({...config, alertType: 'success'})

export {
  createMessage,
  createError,
  createSuccess,
}
