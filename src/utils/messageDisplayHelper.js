import { messageActionCreator } from '../TodoActionCreators';
import { useSelector, useDispatch } from 'react-redux'


// const dispatch = useDispatch();
export const messageDisplayHelper = (response,dispatch) => {
    if (response.data.status === 404 || response.data.status === 500) {
        dispatch(messageActionCreator({ message: response.data.message, variant: 'danger' }));
    } else if (response.data.status === 200) {
        dispatch(messageActionCreator({ message: response.data.message, variant: 'success' }));
    }
}