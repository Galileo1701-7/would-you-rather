import React, { Component } from "react";
import { connect } from 'react-redux'


class Scorecard extends Component {
    render() {
        //console.log('scorecard.js =', this.props)
        
        return(
            <>
            <hr></hr>
            <div className='scorecard'>
                scorecard for {this.props.userName}
            </div>
            <div>
                <img 
                height="100" width="100"
                src={this.props.avatar}
                alt={`Avatar of ${this.props.userName}`}
                className='avatar'
                />
            </div>
            <div>                
                Questions Answered = {this.props.qAnsweredSum}<br></br>
                Questions Created = {this.props.qCreatedSum}
            </div>
            <div>
                TOTAL SCORE = {this.props.totalScore}
            </div>            
            </>
        )
    }
}


function mapStateToProps ({authedUser, users}, {id}) {
    //const authedUserProfile = users[authedUser]
    //const userName = user.name
    const user = users[id]
    const qAnsweredSum=Object.keys(user.answers).length
    const qCreatedSum=Object.keys(user.questions).length
    const totalScore=qAnsweredSum+qCreatedSum
    

    return {
        authedUser,
        //authedUserName: authedUserProfile.name,
        user,
        userName: user.name,
        avatar: user.avatarURL,
        qAnsweredSum,
        qCreatedSum,
        totalScore,               
    }    
}

export default connect(mapStateToProps)(Scorecard)