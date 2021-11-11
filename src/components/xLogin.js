import React, { Component } from "react";
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


class Login extends Component {
    state = { 
        selectValue: '',
    }  

    handleChange = (e) => {
        const selectValue = e.target.value        
        //console.log('select =',selectValue)
        this.setState(() => ({
            selectValue            
        }))
    }

    handleSubmit = (e) => {
     //    const { dispatch } = this.props
        console.log(this.state.selectValue)
        //dispatch(setAuthedUser(this.state.selectValue));
        //dispatch(setAuthedUser(AUTHED_ID))
}

    render(){
        const { selectValue } = this.state
        //console.log('login props = ', this.props)
        return(
            <div>
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