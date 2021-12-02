import React, { Component } from "react";
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'
import NoMatchPage from './NoMatchPage'
import QuestionDetails from "./QuestionDetails";


class QuestionUnanswered extends Component {
    state = {
        selectedOption:'',
        redirectTo: false
    }

    handleChange = (e) => {
        //e.preventDefault()
        this.setState({
            selectedOption: e.target.value
          });    
          //console.log('selected option = ', this.state.selectedOption)
    }


    handleSubmit = (e) => {
        e.preventDefault()
        
        const { dispatch } = this.props
        //console.log('submitted option = ', this.state.selectedOption)
        dispatch(handleAnswerQuestion(this.props.id, this.state.selectedOption)) 
        .then(this.setState(() => ({
            redirectTo: true,                       
        })))
       
    }
    render (){
        if (this.props.question === null) {
			return <NoMatchPage />;
		}
        if (this.props.authedUser===''){
            return <Redirect to='/login' /> 
        }
        
        
        if (this.state.redirectTo === true) {
            //console.log('REDIRECTING NOW')
           
            return <QuestionDetails questionId={this.props.id}/>;
          }
        
        //console.log('selected option = ', this.state.selectedOption)
        return (
            <div>
                <div><h2 className='center'> Please answer the following... </h2> </div>
                <div>Question by - {this.props.by}</div>
                <img 
                    height="100" width="100"
                    src={this.props.avatar}
                    alt={`Avatar of ${this.props.by}`}
                    className='avatar'
                />
                <div><h3>Would you rather...</h3></div>
                <div>Option one - {this.props.optionOne} ?</div>
                <div>---OR---</div>
                <div>Option two - {this.props.optionTwo} ?</div>

                <form onSubmit={this.handleSubmit}>
                <div>
                    <hr></hr>

                    <h4>Your vote....</h4>
                    <p>
                    <input 
                        type="radio" 
                        value="optionOne" 
                        checked={this.state.selectedOption === "optionOne"}
                        onChange={this.handleChange}
                        /> Option One - {this.props.optionOne}

                    <br></br>--OR--<br></br>

                    <input 
                        type="radio" 
                        value="optionTwo" 
                        checked={this.state.selectedOption === "optionTwo"}
                        onChange={this.handleChange}
                        /> Option Two - {this.props.optionTwo}

                    </p>
                    <Button disabled= {this.state.selectedOption==='' || this.props.authedUser===''} className="btn btn-default" type="submit">
                        Submit
                    </Button>
                    <hr></hr>
                </div>
                </form>                
            </div>
        ) 
    }
}

function mapStateToProps ({authedUser, users, questions}, props) {
    const question = questions[props.questionId]
    const author = users[question.author]
    

    return {
         authedUser,
         id: question.id,
         by: author.name,
         avatar: author.avatarURL,
         optionOne: question.optionOne.text,
         optionTwo: question.optionTwo.text, 
         question,
        
    }
    
}

export default connect(mapStateToProps)(QuestionUnanswered)