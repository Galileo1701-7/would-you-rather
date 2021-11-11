import NewQuestion from '../components/NewQuestion'
import { saveQuestion } from '../utils/api'



export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,

    }
}



////////////////////////////////////////////////////////////////////////////////////////////
// adding a new question
export function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,

    }
}

export function handleAddQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser} = getState() 
        console.log('action user=', authedUser)
        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
            //author: 'tylermcginnis'
            
        }).then((question) => dispatch(addQuestion(question)))
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////