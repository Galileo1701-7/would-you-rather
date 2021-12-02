import React, { Component } from "react";
import { connect } from 'react-redux'
import Scorecard from './Scorecard'
import { Redirect } from 'react-router-dom'

class Question extends Component {
    
    render() {
        if (this.props.authedUser===''){
            return <Redirect to={`/login?redirect=leaderboard`} /> 
        }
        
        //console.log('question.js =', this.props)
        
        return(
            <>
            <div>
                <hr></hr>
                <h2 className='center'> Here is your LEADERBOARD! </h2> 
                
                <ul className = 'questionList'>                 
                    {this.props.sortedList.map((user) => (
                       <li key={user.id}> <Scorecard id={user.id} /> </li>
                        
                    ))}
                </ul>                
                
            </div>
            
            </>
        )
    }
}


function mapStateToProps ({authedUser, users }) {
    const userIdsList= Object.keys(users)
    const sortedList = Object.values(users)
    .map(user =>({
        id:user.id,
        totalScore: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a,b) => b.totalScore - a.totalScore);
    
    return {
        sortedList,
        authedUser,
        userIds: userIdsList.sort((a,b) => users[a].id - users[b].id), 
        users        
        
    }
   
}

export default connect(mapStateToProps)(Question)