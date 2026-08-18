import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../features/auth/authSlice";
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
  CircularProgress,
  Avatar
} from "@mui/material";
import { Eye, EyeOff, UserPlus, Mail, Lock, User, Camera } from "lucide-react";
import PageTitle from "../components/PageTitle";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', py: 10 }}>
      <PageTitle title="Register - ShopEasy" />
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
                  bgcolor: 'secondary.main', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 10px 20px rgba(236, 72, 153, 0.3)'
                }}
              >
                <UserPlus color="white" size={30} />
              </Box>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Join ShopEasy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Experience the best e-commerce platform with amazing deals
              </Typography>
            </Box>

            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={20} className="text-slate-400" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  variant="outlined"
                  type="email"
                  required
                  value={email}
                  onChange={onChange}
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
                  name="password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={onChange}
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

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  sx={{ 
                    py: 1.8, 
                    borderRadius: 3, 
                    fontSize: '1rem', 
                    fontWeight: 700,
                    boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 25px rgba(236, 72, 153, 0.4)' }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">OR</Typography>
                </Divider>

                <Typography variant="body2" color="text.secondary" align="center">
                  Already have an account?{" "}
                  <Typography 
                    component={RouterLink} 
                    to="/login" 
                    variant="body2" 
                    color="secondary" 
                    sx={{ textDecoration: 'none', fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}
                  >
                    Sign In
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

export default Register;
