import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useDocumentTitle } from '../components/useDocumentTitle';
import ProfileDetails from '../components/ProfileDetails';
import ChangePassword from '../components/ChangePassword';
import DeleteAccount from '../components/DeleteAccount';
import VerifyEmail from '../components/VerifyEmail';

import { getUser } from '../helpers/fbHelper';

export default function Profile({uid}) {
  useDocumentTitle(`Profile`);

  const navigate = useNavigate();

  useEffect(() => {
    if (uid === null) {
      return navigate('/signin');
    }
  }, [uid, navigate]);

  if (uid === null || uid === -1) {
    return null;
  }

  const user = getUser();
  const isVerified = user?.emailVerified === true;
  const emailAddress = user?.email ? user.email : '';

  return (
    <Container component="main" fixed sx={{marginTop: 2}}>
      <Typography component="h1" variant="h5" sx={{mb: 2}}>
        Profile
      </Typography>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Profile Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProfileDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters hidden={isVerified}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Verify Email</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {emailAddress}
            {isVerified && (<span>&nbsp;(verified)</span>)}
            {!isVerified && (<span>&nbsp;(unverified)</span>)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <VerifyEmail />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Change Password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChangePassword />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Delete Account</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DeleteAccount />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
