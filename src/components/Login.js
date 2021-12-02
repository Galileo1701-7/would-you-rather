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
        //console.log(this.state.selectValue)
        const finalSelectValue = (this.state.selectValue !=='logout') ? this.state.selectValue : ''
        dispatch(setAuthedUser(finalSelectValue));
        
        this.setState(() => ({
            selectValue: '',
            toHome: this.state.selectValue==='' ? false : true,
          }))
}

    render(){
        //console.log('match=', this.props.match)
        const { selectValue } = this.state
        const { toHome } = this.state
        //console.log('url =', this.props.location.search)
        const queryString = require('query-string');
        const parsed = queryString.parse(this.props.location.search);
        //console.log('url parsed =', parsed)
        //console.log('login props = ', this.props)
        //const loggedInUser = this.props.authedUser
        //console.log('redirect parsed =' ,parsed.redirect)

        if (toHome === true) {
            //return <Redirect to='/' />
            if(parsed.redirect){
                return <Redirect to={parsed.redirect} />
            }else{
                return <Redirect to='/home' />
            }
          }
        
        return( 
            <div>
                <h2>The logged in user is {this.props.userName}!</h2>
            Please login or logout using the drop down below....
            <form onSubmit={this.handleSubmit}>
                <label >Pick a user or logout - </label>
                    <select id="userListSelect" onChange={this.handleChange} value={selectValue}>
                    <option key='1' value='' placeholder='pick one'>Pick one...</option>
                        <option key='logout' value="logout">LOGOUT</option>  
                        {this.props.userList.map((x) => (                                               
                            <option key={x.value} value={x.value}>{x.userName}</option> 
                        ))
                        }
                        
                    </select>
                {/* <button id="btn" disabled={selectValue===''}>Sign In Please</button> */}
                <button id="btn" >Execute</button>
            </form>

            </div>
        )
    }
}
    function mapStateToProps({ users, authedUser }) {
        const userName = (authedUser==='') ? 'Nobody' : users[authedUser].name
        return{
            userName,
            authedUser,
            userList: Object.keys(users).map((id) =>({
                value: id,
                userName: users[id].name
            }))
        }
    }

export default connect(mapStateToProps)(Login)