import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import OAuth from '../components/OAuth'
import {toast} from 'react-toastify'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })
  
  const {email, password, name} = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    const user = userCredential.user

    updateProfile(auth.currentUser, {
      displayName: name 
    
    })

    const formDataCopy = {...formData}
    delete formDataCopy.password
    formDataCopy.timestamp = serverTimestamp()
    await setDoc(doc(db, 'users', user.uid), formDataCopy)

    navigate('/')
    } catch(error){
      toast.error('Something went wrong with the registration.')
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
            type="name" 
            id="name" 
            placeholder='Name' 
            className="nameInput"
            value={name}
            onChange={onChange} 
            />
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
              value={password}
              type={showPassword ? 'text' : 'password'} 
              onChange={onChange}
              />
            <img 
              src={visibilityIcon} 
              alt="Show Password" 
              className='showPassword' 
              onClick={()=> setShowPassword((prevState)=> !prevState)} 
              />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' witdth='34px' height='34px' />
            </button>
          </div>
        </form>
        
        <OAuth />

        <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
      </div>
    </>
  )
}

export default SignUp