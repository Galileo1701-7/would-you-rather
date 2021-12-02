import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Leaderboard from './Leaderboard'
import Login from './Login'
import NewQuestion from './NewQuestion';
import NavBar from './NavBar'
import QuestionDetails from './QuestionDetails'
import questionUnanswered from './QuestionUnanswered'
import NoMatchPage from './NoMatchPage'
import Questions from './Questions'




class App extends Component {
  

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
   

    return (
      <Router>
      <>
      
      <div className="container">
               
        {this.props.loading ===true 
        ? null 
        : <div><div> <NavBar/> </div>
        <div>
         
        <Switch>
        <Route exact path='/'  component={Home} />
        <Route path='/home'  component={Home} />
        <Route path='/login' component= {Login} />
        <Route path='/leaderboard' component={Leaderboard} /> 
        <Route path='/new' component={NewQuestion} />
        <Route path='/add' component={NewQuestion} />
        <Route exact path='/questions/:id' component={Questions} />
        <Route path='/questionunanswered/:id' component={questionUnanswered} /> 
        <Route path='/questiondetails/:id' component={QuestionDetails} /> 
         
        <Route component={NoMatchPage}/> 
        </Switch>      
      </div>
      </div>}  
        
        

      </div>

      </>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser}) {
   
  return {
      loading: authedUser === null
      
  }
}

export default connect(mapStateToProps)(App)