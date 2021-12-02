import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'
import  Button from 'react-bootstrap/Button'


class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }


    handleChange = (e) => {
        //console.log('optionOne = ', this.state.optionOne)
        const targetName = e.target.id
        const targetValue = e.target.value        
        this.setState(() => ({
                [targetName] : targetValue
             }))
              
    }


    handleSubmit = (e) => {
        e.preventDefault()
        
        const { optionOne, optionTwo } = this.state
        //const { dispatch }= this.props
        //console.log('optionOne=', this.state.optionOne,' ------ optionTwo=', this.state.optionTwo);
        this.setState(() => ({
            toHome: optionTwo ? true : false,
            optionOne : '',
            optionTwo : '',
            
         }))
         this.props.dispatch(handleAddQuestion(optionOne, optionTwo)) 
        
    }


// todo redirect to home page when question is submitted
    render () {
        if (this.props.authedUser===''){
            return <Redirect to='/login' /> 
        }
       
        const { optionOne } =this.state
        const { optionTwo } =this.state

        if (this.state.toHome === true) {
            return <Redirect to='/'/>
        }
        //console.log('home?', this.state.toHome)
        //console.log('authedUser =', this.props.authedUser)

        return(
            <div><h3>New Question</h3>
            <h4>Would you rather....</h4>
            <form className='newQuestion' onSubmit={this.handleSubmit}>
                <textarea 
                    id="optionOne"
                    placeholder="What is Option 1?"
                    value={optionOne}
                    onChange={this.handleChange}
                    className='textarea'
                    maxLength={200}

                /> 
                --or--
                <textarea 
                    id="optionTwo"
                    placeholder="What is Option 2?"
                    value={optionTwo}
                    onChange={this.handleChange}
                    className='textarea'
                    maxLength={200}

                /><br></br>
                <Button className='btn'
                type='submit'
                disabled={optionOne === '' || optionTwo === '' || this.props.authedUser===''}>
                    Submit Question

                </Button>

            </form>
            </div>
        )
    }
}
function mapStateToProps({authedUser}){
    return{
        authedUser
    };
}

export default connect(mapStateToProps)(NewQuestion)