//import logo from '../../src/logo.svg';
import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Leaderboard from './Leaderboard'
import Login from './Login'
import NewQuestion from './NewQuestion';
import NavBar from './NavBar'



class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
      <>
      
      <div className="container">
        {/* menu bar */}<NavBar/>
        {this.props.loading ===true 
        ? null 
        :  <div>
        <Route exact path='/'  component={Home} />
        <Route path='/login' component= {() => <Login/>} />
        <Route path='/leaderboard' component={Leaderboard} /> 
        {/* <Route path='/question/:id'component={TweetPage} /> */}
        <Route path='/new' component={NewQuestion} />
      </div>}  
        
        
{/*         
        <div>
          <Login />      
      </div> */}

     

      {/* <div>
        {this.props.loading ===true 
        ? null 
        : <NewQuestion />}        
      </div> */}

       {/* <div>
        {this.props.loading ===true 
        ? null 
        : <Home />}        
      </div> */}

      {/* <div>
        {this.props.loading ===true 
        ? null 
        : <Leaderboard />}        
      </div> */}
      </div>

      </>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
      loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
//connect to get access to dispatch

















// function App() {

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
