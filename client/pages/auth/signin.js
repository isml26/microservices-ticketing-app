import {useState} from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
      url: '/api/users/signin',
      method: 'post',
      body: {
        email,
        password
      },
      onSuccess: ()=>Router.push('/'),
    });
  
    const onSubmit = async event => {
      event.preventDefault();
      await doRequest();
    };
  
  
    return (
      
      <div className='page'>
      <div className="form">
      <form onSubmit={onSubmit} className="form-group">
      <h1>Sign In</h1>
      <div>
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <div className="form-button">
      <button className="btn btn-primary">Sign In</button>
      </div>
    </form>
      </div>
      <p>Welcome to TicketX</p> 
      </div>
   
    )
  };
   
  export default Signup;