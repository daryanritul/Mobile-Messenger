import * as actions from '../actions/actions.types';

const intialState = {
  chatList: [],
};

const setChat = (state, payload) => {
  const index = state.chatList.findIndex(
    (object) => object.chatId === payload.chatId,
  );
  return {
    ...state,
    chatList:
      index >= 0
        ? [
            ...state.chatList.slice(0, index),
            {
              ...state.chatList[index],
              messages: payload.messages,
            },
            ...state.chatList.slice(index + 1),
          ]
        : [...state.chatList, payload],
  };
};

const chatCleanUp = (state) => {
  return intialState;
};

export default (state = intialState, {type, payload}) => {
  switch (type) {
    case actions.SET_CHAT:
      return setChat(state, payload);

    case actions.CHAT_CLEAN_UP:
      return chatCleanUp(state);

    default:
      return state;
  }
};
