import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'



///////////////////////////////////////////////////////////////////////////////////////////
//receive questions
export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,

    }
}

////////////////////////////////////////////////////////////////////////////////////////////
// adding a new question
export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,

    }
}

export function handleAddQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser} = getState() 
        //console.log('action user=', authedUser)
        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
            //author: 'tylermcginnis'
            
        }).then((question) => dispatch(addQuestion(question)))
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////
// answering a question handleAnswerQuestion
export function answerQuestion({qid,  answer, authedUser}) {
    //console.log('action params2:' ,authedUser, qid, answer)
    return {
        type: ADD_ANSWER,
        answerInfo: {
            qid,            
            answer,
            authedUser,
            
        }
    }
}

export function handleAnswerQuestion(qid, answer) {
    return (dispatch,getState) => {
        const { authedUser } = getState()
        //console.log('action params:' ,authedUser, qid, answer)
        return saveQuestionAnswer({
            qid,            
            answer,
            authedUser,
        })
        .then(() => 
            dispatch(
                answerQuestion({
                    qid,                    
                    answer,
                    authedUser,
                })
            )
        )

    } 
}