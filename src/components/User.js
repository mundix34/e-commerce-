import React, { Component } from 'react';
import axios from 'axios';

export default class User extends Component {
  constructor() {
    super();

    this.state = {
      user: [],
      result: ''
    };
  }

  componentDidMount() {
    axios.get(`/api/user/${this.props.match.params.id}`).then(res => {
        this.setState({
            user: res.data,
            result: res.data[0].user_names,


        })
    })
}

  render() {
    const user = this.state.user.map((e, i) => (
      <h3 key={ e.user_id }>{ e.user_role } { e.user_names }</h3>
    ));

    return (
      <div className='box'>
        <h1>(this.props.match.params.id){ this.props.match.params.id }</h1>
        { user }
      </div>
    )
  }
}