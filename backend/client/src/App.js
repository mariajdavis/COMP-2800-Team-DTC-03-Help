import React from 'react';
import './App.css';

class App extends Component {
  state = {
    users: []
  }
  componentDidMount(){
    this.getUsers();
  }
  getUsers = _ => {
    fetch('http://localhost:3001')
      .then(response => console.log(response))//response.json())
      .then(({ response }) => this.setState({ users: 'response.users' }))
      .catch(error => console.log(error));
  }
  showUsers = user => <div key={user.id}>{ user.username }</div>
  render() {
    return (
      <div className="App">
        {users.map(this.showUsers)}
      </div>
      );
  }
}

export default App;
