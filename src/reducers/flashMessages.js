import { ADD_FLASH_MESSAGE, DEL_FLASH_MESSAGE } from '../constants/flashMessages.js';
import shortid from 'shortid';

const flashMessages = (state = [], action) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ]
    case DEL_FLASH_MESSAGE:
      return state.filter((s) => s.id !== action.id);
    default:
      return state;
  }
}
export default flashMessages;
