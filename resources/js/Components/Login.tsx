import React, { useEffect, useState, useRef } from 'react'
import login_image from '../assets/vite.svg'
const expirationDuration = 1000 * 60 * 60 * 24 * 7

const Login = () => {
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef : any = useRef(undefined)
  const passwordRef : any = useRef(undefined)


  const handlePhpLogin = () => {
    if(!email || !password){
      alert('Please Enter Email and Password')
      return
    }
    setLoading(true)
    const url = `https://animateq.theartpeople.com.sg/api/?e=${email}&p=${password}`
    fetch(url).then(res => res.json())
    .then(result => {
      if(result.isFound){
        const now = new Date()
          localStorage.setItem('aq_email', JSON.stringify({
            value: email,
            expiry: now.getTime() + expirationDuration ,
          }))
          localStorage.setItem('aq_password', password)
          window.location.reload()
      }else {
        alert('No user correspoding to the information found')
        setLoading(false)
      }
    })
    .catch(e => console.error(e))
  }

  return (
    <div className="min-h-screen bg-gray-700">
  <div className="px-6 h-full text-white">
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0 flex-row-center"
      >
        <img
          src={login_image}
          className="w-4/6 lg:mt-20 lg:-ml-20 h-56"
          alt="Login Image"
        />
      </div>
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        {/* <form onChange={(e) => console.log(e.currentTarget)}> */}
          <div className="flex flex-row items-center justify-center w-full">
            <p className="text-2xl font-extrabold font-sans mb-0 mr-4">AnimateQ</p>
          </div>

          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-center font-semibold mx-4 mb-0">Login</p>
          </div>

          <div className="mb-6">
            <input
              ref={emailRef}
              type="text"
              value={email}
              onChange={(e) => {
                // alert('value ' + e.target.value )
                setEmail(e.target.value)}}
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none select-text"
              placeholder="Email address"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              value={password}
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none select-text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>

          <div className="text-center lg:text-left">
            <button
              type="button"
              className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={handlePhpLogin}
              style={{minWidth : '155px'}}
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Processing...": "Login"}
            </button>
          </div>
        {/* </form> */}
      </div>
    </div>
  </div>
</div>
  )
}

export default Login