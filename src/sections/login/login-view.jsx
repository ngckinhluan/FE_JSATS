import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [counterId, setCounterId] = useState('');  
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5188/api/User/Login', {
        email,
        password,
        counterId,
      });
      if (response.status === 200) {
        const { token, expiration } = response.data;
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        localStorage.setItem('sub', decodedToken.sub);
        localStorage.setItem('nameid', decodedToken.nameid);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('exp', expiration);
        router.push('/dashboard');
        toast.success('You have successfully logged in. Welcome!');
      } else {
        toast.error('Login information error');
      }
    } catch (e) {
      toast.error('Error with login response');
      console.error('Login error:', e);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="Email"
          required
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        onClick={handleClick}
        variant="contained"
        color="inherit"
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Sign in to Minimal
          </Typography>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Login with your email
            </Typography>
          </Divider>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
