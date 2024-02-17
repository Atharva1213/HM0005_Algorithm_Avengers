import React from 'react';
import axios from 'axios';

const hostname = process.env.REACT_APP_HOSTNAME|| 'localhost:9190';
const protocol = process.env.REACT_APP_PROTOCOL|| 'http';

export default function Main() {
  const handle = async () => {
    axios.post(`${protocol}://${hostname}/api/login`,{
      "user_name": "john_doe",
      "password": "secretpassword"
    })
    .then((res) => {
      console.log(res.data);    
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div>
      <button onClick={handle}>Click me</button>
    </div>
  );
}
