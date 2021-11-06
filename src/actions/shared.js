import { getInitialData } from '../utils/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'

//replace with dropdown from UI to select authed user
const AUTHED_ID = 'tylermcginnis'

//since we are return a function from an action creator, THUNK is required
export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
        .then(({users, questions}) =>{
            dispatch(receiveQuestions(questions))
            dispatch(receiveUsers(users))
            dispatch(setAuthedUser(AUTHED_ID))

        })
    }
}