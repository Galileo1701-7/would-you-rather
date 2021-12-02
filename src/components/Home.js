import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Redirect } from 'react-router-dom'



class Home extends Component {

    render() {
        if (this.props.authedUser===''){
            return <Redirect to='/login' /> 
        }
       
        //console.log('home props = ', this.props)
        return(
            <>
                <div style={{ display: 'block', width: 700, padding: 30 }}>
                <h4>Click a question to answer or see results...</h4>
                <Tabs defaultActiveKey="first">
                    
                    <Tab eventKey="first" title="Unanswered Questions">
                    <h2 className='center'>UNANSWERED questions for {this.props.authedUserName}</h2> 
                    <ul className = 'questionList'>                 
                        {this.props.questionIds.map((id) => {
                            return (!(this.props.questions[id].optionOne.votes.includes(this.props.authedUser) || this.props.questions[id].optionTwo.votes.includes(this.props.authedUser)) )
                            ?
                            <li key={id}><Question id={id} /></li>
                            :null
                        }
                        )}
                    </ul>
                    <hr></hr>
                    </Tab>
                    
                    <Tab eventKey="second" title="Answered Questions">
                    <h2 className='center'>ANSWERED questions for {this.props.authedUserName}</h2> 
                    <ul className = 'questionList'>
                        {this.props.questionIds.map((id) => {
                            return (this.props.questions[id].optionOne.votes.includes(this.props.authedUser) || this.props.questions[id].optionTwo.votes.includes(this.props.authedUser)) 
                            ?
                            <li key={id}><Question id={id} /></li>
                            :null
                            }
                        )}
                    </ul>

                    </Tab>                          
                    
                </Tabs>
                </div>
                      
            </>
        )
    }
}



function mapStateToProps ({ questions, authedUser, users }) {
    
    const questionIds = Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    
    return {
        questionIds,
        authedUserName: (authedUser==='')?'LOGIN PLEASE' : users[authedUser].name,        
        authedUser,
        questions,
        
    }
}

export default connect(mapStateToProps)(Home)