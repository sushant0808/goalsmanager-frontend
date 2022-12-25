import { ACTIONS } from "./TodoActions"

const todoInitialState = {
    todos: [],
    responseMessage: {
        message: '',
        variant: '',
    },
    user:{},
}

export const TodoReducer = (state = todoInitialState, action) => {
    switch (action.type) {

        case ACTIONS.SET_USER:
            return {
                ...state,
                user:action.payload,
            }

        case ACTIONS.ADD_TASK:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload,
                ]
            }

        case ACTIONS.DISPLAY_TASK:
            return {
                ...state,
                todos: [
                    ...action.payload,
                ]
            }

        case ACTIONS.DELETE_TASK:
            return {
                ...state,
                todos: [...action.payload]
            }

        case ACTIONS.EDIT_TASK:
            return {
                ...state,
                todos: [...state.todos, ...action.payload]
            }

        case ACTIONS.DISPLAY_RESPONSE_MESSAGE:
            return {
                ...state,
                responseMessage: action.payload,
            }

        case ACTIONS.CLEAR_ALL_TASK:
            return {
                todos: [],
                responseMessage: {}
            }

        case ACTIONS.COMPLETE_TASK:
            return {
                ...state,
                todos: [...action.payload]
            }

        case ACTIONS.SHOW_COMPLETE_TASK:
            const completedTasks = action.payload.filter((todo) => {
                return todo.isComplete === true;
            })

            return {
                ...state,
                todos: [...completedTasks],
            }

        case ACTIONS.SHOW_INCOMPLETE_TASK:
            const incompleteTasks = action.payload.filter((todo) => {
                return todo.isComplete === false;
            })

            return {
                ...state,
                todos: [...incompleteTasks],
            }

        case ACTIONS.SHOW_ALL_TASKS:
            return {
                ...state,
                todos:[...action.payload],
            }

        case ACTIONS.SORT_TASKS:
            return {
                ...state,
                todos:[...action.payload],
            }
        default:
            return state;
    }
}