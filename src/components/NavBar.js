import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Nav extends Component {

  render() {
        
    return(
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      
        <img src={this.props.userURL} alt='user avatar' width="75" height="75" /> {this.props.userName}
     
      <ul className="navbar-nav">
        <li>
          <NavLink to='/' exact  className='nav-link'>
            Question List (home) 
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' className='nav-link'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' className='nav-link'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' className='nav-link'>
            Login/Logout
          </NavLink>
        </li>
       
      </ul>
    </nav>
      
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const userName = (authedUser==='') ? 'YOU ARE NOT LOGGED IN' : users[authedUser].name
  const userURL = (authedUser==='') ? 'https://pixy.org/src/68/thumbs350/682222.jpg' : users[authedUser].avatarURL
  

  return {
    userName,
    userURL,
    
  };
}

export default connect(mapStateToProps)(Nav);