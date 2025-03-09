

import "./register.css"
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import  useAuth  from "../../hooks/useAuth";
function Register( {onSubmit , setIsLogin} ) {

    const {registerMutation } = useAuth();

    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ name , setName ] = useState('');

    const handleSubmit = () => {
        console.log(username , password , name);
        
        registerMutation.mutate({username , password , name});
      };
    
      return (
        <div className="register">


<div className="list-2">

<img src="" alt="" />

<p>Welcome back to</p>

<h1>Shopping List</h1>
</div>


        <div className="register-container">
          <div className="register-form">
          <h2>Register</h2>
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input className="input" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input className="input"  onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password className="input" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form>
          <p>
            Already have an account? <Link to="/login" >Login</Link>
          </p>
          </div>

        </div>



        </div>
    )
}   

export default Register






// import { useForm } from "react-hook-form"

// export default function App() {
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       category: "",
//       checkbox: [],
//       radio: "",
//     },
//   })

//   return (
//     <form onSubmit={handleSubmit(console.log)}>
//       <input
//         {...register("firstName", { required: true })}
//         placeholder="First name"
//       />

//       <input
//         {...register("lastName", { minLength: 2 })}
//         placeholder="Last name"
//       />

//       <select {...register("category")}>
//         <option value="">Select...</option>
//         <option value="A">Category A</option>
//         <option value="B">Category B</option>
//       </select>

//       <input {...register("checkbox")} type="checkbox" value="A" />
//       <input {...register("checkbox")} type="checkbox" value="B" />
//       <input {...register("checkbox")} type="checkbox" value="C" />

//       <input {...register("radio")} type="radio" value="A" />
//       <input {...register("radio")} type="radio" value="B" />
//       <input {...register("radio")} type="radio" value="C" />

//       <input type="submit" />
//     </form>
//   )
// }