import React, { Component } from "react";
import { connect } from 'react-redux'
//import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
//import NoMatchPage from './NoMatchPage'



class QuestionDetails extends Component {
    render (){
         
        if (this.props.authedUser===''){
            return <Redirect to={`/login?redirect=${this.props.match.url}`} /> 
        }
       
        return (
            <div>
                
                <div><h2 className='center'> Poll Results! </h2> </div>
                <div>Question by - {this.props.by}</div>
                <img 
                    height="100" width="100"
                    src={this.props.avatar}
                    alt={`Avatar of ${this.props.by}`}
                    className='avatar'
                />
                <div>Option one - {this.props.optionOne} votes={this.props.optionOneVotes} percent={(this.props.optionOneVotes / this.props.totalVotes)*100}%</div>
                <div>Option two - {this.props.optionTwo} votes={this.props.optionTwoVotes} percent={(this.props.optionTwoVotes / this.props.totalVotes)*100}%</div>
                <div>Total Votes = {this.props.totalVotes}</div>
                <div>You voted for  - {this.props.yourVote}</div>
            </div>
        ) 
    }
}

function mapStateToProps ({authedUser, users, questions}, props) {
    const question = questions[props.questionId]
    const author = users[question.author]
    

    const yourVote = (question.optionOne.votes.includes(authedUser) 
        ? "Option ONE" 
        :  (question.optionTwo.votes.includes(authedUser) 
        ? "Option TWO" 
        : "Unanswered"))


     //console.log('q1 vote', question.optionOne.votes.includes(authedUser))
     //console.log('q2 vote', question.optionTwo.votes.includes(authedUser))

    return {
         authedUser,
         id: question.id,
         by: author.name,
         avatar: author.avatarURL,
         optionOne: question.optionOne.text,
         optionTwo: question.optionTwo.text, 
         optionOneVotes: question.optionOne.votes.length,
         optionTwoVotes: question.optionTwo.votes.length,  
         totalVotes: question.optionOne.votes.length + question.optionTwo.votes.length,
         yourVote,
        
    }
    
}

export default connect(mapStateToProps)(QuestionDetails)