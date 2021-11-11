import React, { Component } from "react";
import { connect } from 'react-redux'
import Scorecard from './Scorecard'

class Question extends Component {
    
    render() {
        
        console.log('question.js =', this.props)
        
        return(
            <>
            <div>
                <hr></hr>
                <h2 className='center'>{this.props.authedUserName}, Here is your LEADERBOARD! </h2> 
                
                <ul className = 'questionList'>                 
                    {this.props.userIds.map((id) => (
                       <li key={id}> <Scorecard id={id} /> </li>
                        
                        // <li key={id}>Users by id={id} </li>
                        
                    ))}
                </ul>                
                
            </div>
            
            </>
        )
    }
}


function mapStateToProps ({authedUser, users }) {
    const authedUserProfile = users[authedUser]
    const userIdsList= Object.keys(users)
    //const userIds= Object.keys(users).sort((a,b) => users[b].name - users[a].name),


    //const totalScore= Object.keys(users[idA].answers).length + users[idA].questions.length;

    return {
        authedUser,
        authedUserName:authedUserProfile.name,
        //userIds: userIdsList.sort((a,b) => users[a].id - users[b].id), 
        userIds: Object.keys(users)
        .sort((a,b) => users[a].name - users[b].name),  
        users        
        
    }
   
}

export default connect(mapStateToProps)(Question)