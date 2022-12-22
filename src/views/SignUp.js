
import { signUp } from '../helpers/fbHelper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function SignUp({navigation}) {
  const navigate = useNavigate();

  const clickSignUp = () => {
    console.log('click');
    signUp('pete.lepage@pobox.com', 'password12345');
    navigate('/incoming');
  }

  return (
    <div>
      <h1>SignUp</h1>
      <Button onClick={clickSignUp}>
        Sign Up
      </Button>
    </div>
  );
}
