import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NoMatchPage from './NoMatchPage'
import QuestionDetails from "./QuestionDetails";
import QuestionUnanswered from "./QuestionUnanswered";

class Questions extends Component {
    render() {
        //console.log('id= ', this.props.question)
        let display ='';
        if (this.props.authedUser===''){
            return <Redirect to={`/login?redirect=${this.props.match.url}`} /> 
        }
        if (this.props.question === null) {
			display = <NoMatchPage />;
		}
        if (this.props.question !== null && this.props.yourVote !== 'Unanswered') {
            
            display = <QuestionDetails questionId={this.props.id}/>;
            //display = <h3>answered</h3>

        }
        if (this.props.question !== null && this.props.yourVote === 'Unanswered' ) {
            ////console.log('UNANSWERED', this.props.yourVote)
            display = <QuestionUnanswered questionId={this.props.id}/>;
            //display = <h3>unanswered</h3>

        }


        ////console.log('question.js =', this.props)
        
        return(
            
            <>
            {display}
            </>
        )
    }
}



function mapStateToProps ({authedUser, users, questions}, props) {
    const { id } = props.match.params
    //console.log('id from url =',id)
    const question = (questions[id]) ? questions[id] : null;
    
    let yourVote = "Unanswered"
    if (questions[id]){
     yourVote = ( question.optionOne.votes.includes(authedUser) 
        ? "Option ONE" 
        :  (question.optionTwo.votes.includes(authedUser) 
        ? "Option TWO" 
        : "Unanswered"))
    }
    return {
        authedUser,
        question,
        id,
        yourVote
        
        
    }
    
}

export default connect(mapStateToProps)(Questions)