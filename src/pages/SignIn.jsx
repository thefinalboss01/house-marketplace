import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import OAuth from '../components/OAuth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  
  const {email, password} = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try{
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

    if(userCredential.user){
      navigate('/')
    }
  } catch(error){
    toast.error('Bad User Credentials')
  }
    }
    
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input 
            type="email" 
            id="email" 
            placeholder='Email' 
            className="emailInput"
            value={email}
            onChange={onChange} 
            />
          <div className="passwordInputDiv">
            <input 
              className='passwordInput' 
              id='password' 
              placeholder='Password' 
              type={showPassword ? 'text' : 'password'} 
              onChange={onChange}
              />
            <img src={visibilityIcon} alt="Show Password" className='showPassword' onClick={()=> setShowPassword((prevState)=> !prevState)} />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' witdth='34px' height='34px' />
            </button>
          </div>
        </form>
        
        <OAuth />

        <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
      </div>
    </>
  )
}

export default SignIn