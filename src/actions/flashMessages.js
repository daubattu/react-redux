import { ADD_FLASH_MESSAGE, DEL_FLASH_MESSAGE } from '../constants/flashMessages.js';

export const addFlashMessage = (message) => {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}

export const delFlashMessage = (id) => {
  return {
    type: DEL_FLASH_MESSAGE,
    id
  }
}
