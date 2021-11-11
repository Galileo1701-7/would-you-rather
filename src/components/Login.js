import React, { Component } from "react";
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = { 
        selectValue: '',
        toHome: false,
    }  

    handleChange = (e) => {
        e.preventDefault()
        const selectValue = e.target.value        
        //console.log('select =',selectValue)
        this.setState(() => ({
            selectValue            
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        console.log(this.state.selectValue)
        dispatch(setAuthedUser(this.state.selectValue));
        
        this.setState(() => ({
            selectValue: '',
            toHome: this.state.selectValue==='' ? false : true,
          }))
}

    render(){
        const { selectValue } = this.state
        const { toHome } = this.state
        const loggedInUser = this.props.authedUser

        if (toHome === true) {
            return <Redirect to='/' />
          }
       
        //console.log('login props = ', this.props)
        return( 
            <div>
                <h2>the logged in user is {loggedInUser}!</h2>
            Please login using the drop down below....
            <form onSubmit={this.handleSubmit}>
                <label >Current User List - </label>
                    <select id="userListSelect" onChange={this.handleChange} value={selectValue}>
                    <option key='1' value='' placeholder='pick one'>Pick one...</option>
                        {this.props.userList.map((x) => (                        
                        <option key={x.value} value={x.value}>{x.userName}</option> 
                        ))
                        }
                        
                    </select>
                <button id="btn" disabled={selectValue===''}>Sign In Please</button>
            </form>

            </div>
        )
    }
}
    function mapStateToProps({ users, authedUser }) {
        return{
            authedUser,
            userList: Object.keys(users).map((id) =>({
                value: id,
                userName: users[id].name
            }))
        }
    }

export default connect(mapStateToProps)(Login)