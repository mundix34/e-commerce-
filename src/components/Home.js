import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link} from 'react-router-dom';

class Home extends Component {
  constructor(){
    super()
    this.state={
      id: 1,
      result: '',
      role: '',
      name:'',
      user: []

    }
    this.handleChange=this.handleChange.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
  }
  componentDidMount() {
    axios.get(`/api/users`).then(res => {
        this.setState({
            user: res.data

        })
    })
}
  getUser() {
    axios.get(`/api/user/${this.props.match.params.id}`).then(res => {
        this.setState({
            user: res.data,
            result: res.data[0].user_names,


        })
    })
}
  
  handleChange(e){
    this.setState({ role: e.target.value,
    
    })
    
  }
  handleChange2(e){
    this.setState({ 
      name: e.target.value
    })
    
  }
  postUser(){
     let newUser={
      user_role: this.state.role,
      user_names: this.state.name
    }
    axios.post(`/api/userpost`, newUser).then( res => {
      console.log(res.data);
      
      this.setState({ user: res.data})
    })
  }
  editUser(getId,newUser) {
    newUser={
      user_role: this.state.role,
      user_names: this.state.name
    }
    
    axios.put(`/api/userput?user_id=${getId}`, newUser).then((res) => {
      this.setState({
        user: res.data
      })
      alert('Edited')

    })
  }
  deleteUser(id) {
    axios.delete(`/api/userdelete?user_id=${id}`).then((res) => {
      this.setState({
        user: res.data
      })

    })
  }
  render() {
    const userArray=this.state.user.map( (e, i) => (
      <div key={i}> 
        <p> {e.user_role}</p>
        <p> {e.user_names}</p>
        <button onClick={() => this.deleteUser(e.user_id)}> Delete</button>
        <button onClick={() => this.editUser(e.user_id)}> Edit</button>

      </div>
    ))
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React, Server and DB competencies</h1>
        </header>
        <h1>get endpoint:{this.state.result}</h1>
        <input placeholder="enter role"onChange={this.handleChange}/>
        <input placeholder="enter name"onChange={this.handleChange2}/>
        <button onClick={(newUser) => this.postUser(newUser)}> Submit</button>
        <button onClick={() => this.getUser()}> Get user</button>
        <Link to='/user/1'><button >View User One</button></Link>
        <Link to='/user/4'><button >View User four</button></Link>

        <div> { userArray}</div>

       
      </div>
    );
  }
}

export default Home;
