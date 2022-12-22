
import { signIn } from '../helpers/fbHelper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
  const navigate = useNavigate();

  const clickSignIn = () => {
    console.log('click');
    signIn('pete.lepage@pobox.com', 'password12345');
    navigate('/incoming');
  }

  return (
    <div>
      <h1>SignIn</h1>
      <Button onClick={clickSignIn}>
        Sign In
      </Button>
    </div>
  );
}
