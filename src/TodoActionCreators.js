import { ACTIONS } from "./TodoActions";

export const setUser = (user) => {
  console.log("setUser", user);
  return {
    type: ACTIONS.SET_USER,
    payload: user,
  };
};

export const addTask = (userTask) => {
  return {
    type: ACTIONS.ADD_TASK,
    payload: userTask,
  };
};

export const displayTask = (allTasks) => {
  console.log("displayTask");
  return {
    type: ACTIONS.DISPLAY_TASK,
    payload: allTasks,
  };
};

export const deleteTask = (allTasks) => {
  return {
    type: ACTIONS.DELETE_TASK,
    payload: allTasks,
  };
};

export const updateTask = (allTasks) => {
  return {
    type: ACTIONS.EDIT_TASK,
    payload: allTasks,
  };
};

export const messageActionCreator = (msg) => {
  return {
    type: ACTIONS.DISPLAY_RESPONSE_MESSAGE,
    payload: msg,
  };
};

export const clearAllTaskCreator = () => {
  return {
    type: ACTIONS.CLEAR_ALL_TASK,
  };
};

export const completeTaskCreator = (allTasks) => {
  return {
    type: ACTIONS.COMPLETE_TASK,
    payload: allTasks,
  };
};

export const showCompleteTaskCreator = (allTasks) => {
  return {
    type: ACTIONS.SHOW_COMPLETE_TASK,
    payload: allTasks,
  };
};

export const showIncompleteTaskCreator = (allTasks) => {
  return {
    type: ACTIONS.SHOW_INCOMPLETE_TASK,
    payload: allTasks,
  };
};

export const showAllTaskCreator = (allTasks) => {
  return {
    type: ACTIONS.SHOW_ALL_TASKS,
    payload: allTasks,
  };
};

export const showSortTaskCreator = (allTasks) => {
  return {
    type: ACTIONS.SORT_TASKS,
    payload: allTasks,
  };
};
