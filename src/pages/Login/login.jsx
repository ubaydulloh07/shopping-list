
import "./login.css"
import { Navigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import  useAuth  from "../../hooks/useAuth";

function Login( {onSubmit , setIsLogin} ) {
const [ username , setUsername ] = useState('');
const [ password , setPassword ] = useState('');

const { loginMutation } = useAuth();
    if(localStorage.getItem("token")) {
        return <Navigate to="/" replace={true} />}

        const handleSubmit = () => {
            console.log(username , password);
            
            loginMutation.mutate({username , password});
            
        };
        
          return (
            <div className="login">

                <div className="list">

                    <img src="" alt="" />
                    
                    <p>Welcome back to</p>

                    <h1>Shopping List</h1>
                </div>




                <div className="login-container">

              <div className="login-form">
              <h2>Sign In</h2>
              <Form layout="vertical">
                <Form.Item name="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" rules={[{ required: true }]}>
                  <Input className="input" name="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                  <Input.Password className="input" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Item>
                <Button type="primary" onClick={handleSubmit}>Sign In</Button>
              </Form>
              <p>
              No account yet? <Link to="/register">Create One.</Link>
              </p>

              </div>
                </div>
            </div>
    )
}

export default Login