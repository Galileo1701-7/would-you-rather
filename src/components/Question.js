import React, { Component } from "react";
import { connect } from 'react-redux'
//import { Link, withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class Question extends Component {
    render() {
        //console.log('question.js =', this.props)
        const id = this.props.id;
        return(
            
            <>
            <Link to={`/questions/${id}`}>
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
            Would you rather.... <br></br>
                {this.props.optionOne}--OR--{this.props.optionTwo} ?
            </div>
           </Link>
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