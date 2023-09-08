import{W as p,r as h,j as e,a as g,d as j}from"./app-00c4ff73.js";import{I as m,T as o,a as n,C as f,P as b}from"./TextInput-66492610.js";function N({status:t,canResetPassword:i}){const{data:a,setData:r,post:d,processing:c,errors:l,reset:x}=p({email:"",password:"",remember:!1});h.useEffect(()=>()=>{x("password")},[]);const u=s=>{s.preventDefault(),d(route("login"))};return e.jsxs("div",{className:"bg-gray-200 min-h-screen grid place-content-center",children:[e.jsx(g,{title:"Log in"}),t&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:t}),e.jsxs("h1",{className:"text-3xl my-4",children:["Signin - ",e.jsx("b",{className:"text-red-400",children:"Motionlayer"})]}),e.jsx("div",{className:"w-full shadow-2xl rounded-2xl p-10 px-20",children:e.jsxs("form",{onSubmit:u,children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"email",value:"Email",children:void 0}),e.jsx(o,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:s=>r("email",s.target.value)}),e.jsx(n,{message:l.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"password",value:"Password",children:void 0}),e.jsx(o,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>r("password",s.target.value)}),e.jsx(n,{message:l.password,className:"mt-2"})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(f,{name:"remember",checked:a.remember,onChange:s=>r("remember",s.target.checked)}),e.jsx("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[i&&e.jsx(j,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e.jsx(b,{className:"ml-4",disabled:c,children:"Log in"})]})]})})]})}export{N as default};
