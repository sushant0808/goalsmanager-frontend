
import { legacy_createStore as createStore} from 'redux'
import { TodoReducer } from './TodoReducer';

export const store = createStore(TodoReducer);