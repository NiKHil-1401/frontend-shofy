import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
  Divider,
  Fade,
  CircularProgress
} from "@mui/material";
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import PageTitle from "../components/PageTitle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', py: 10 }}>
      <PageTitle title="Login - ShopEasy" />
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 6, 
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box 
                sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 3, 
                  bgcolor: 'primary.main', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                }}
              >
                <LogIn color="white" size={30} />
              </Box>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please enter your details to sign in to your account
              </Typography>
            </Box>

            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} className="text-slate-400" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} className="text-slate-400" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />

                <Box sx={{ textAlign: 'right' }}>
                  <Typography 
                    component={RouterLink} 
                    to="/password/forgot" 
                    variant="body2" 
                    color="primary" 
                    sx={{ textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    py: 1.8, 
                    borderRadius: 3, 
                    fontSize: '1rem', 
                    fontWeight: 700,
                    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 25px rgba(99, 102, 241, 0.4)' }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">OR</Typography>
                </Divider>

                <Typography variant="body2" color="text.secondary" align="center">
                  Don't have an account?{" "}
                  <Typography 
                    component={RouterLink} 
                    to="/register" 
                    variant="body2" 
                    color="primary" 
                    sx={{ textDecoration: 'none', fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}
                  >
                    Create Account
                  </Typography>
                </Typography>
              </Stack>
            </form>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
