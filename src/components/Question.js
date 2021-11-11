import React, { Component } from "react";
import { connect } from 'react-redux'

class Question extends Component {
    render() {
        console.log('question.js =', this.props)
        
        return(
            <>
            <hr></hr>
            <div className='question'>
                question by {this.props.by}
            </div>
            <img 
            height="100" width="100"
            src={this.props.avatar}
            alt={`Avatar of ${this.props.by}`}
            className='avatar'
            />
           <div>
               {this.props.optionOne}-OR-{this.props.optionTwo}
           </div>
            </>
        )
    }
}



function mapStateToProps ({authedUser, users, questions}, {id}) {
    const question = questions[id]
    const author = users[question.author]

    return {
        authedUser,
        by: author.name,
        avatar: author.avatarURL,
        optionOne: question.optionOne.text,
        optionTwo: question.optionTwo.text,
        
        
    }
    
}

export default connect(mapStateToProps)(Question)