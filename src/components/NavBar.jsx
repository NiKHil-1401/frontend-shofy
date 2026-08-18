import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Container,
  InputBase,
  alpha,
  styled,
  Avatar,
  Tooltip,
  Divider
} from "@mui/material";
import { 
  Search as SearchIcon, 
  ShoppingCart as ShoppingCartIcon, 
  UserPlus as PersonAddIcon, 
  Menu as MenuIcon,
  LogOut,
  User,
  ShoppingBag
} from "lucide-react";
import { toast } from "react-toastify";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: theme.transitions.create('width'),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)((({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
})));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleUserMenuOpen = (event) => setUserAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setUserAnchorEl(null);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      if (!search.trim()) return;
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    handleUserMenuClose();
    navigate("/login");
  };

  return (
    <AppBar elevation={0} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: { xs: 64, md: 80 } }}>
          {/* LOGO */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: 800,
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              mr: 4
            }}
          >
            Shop<span style={{ color: '#fff' }}>Easy</span>
          </Typography>

          {/* LINKS (Desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, flexGrow: 1 }}>
            <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 600, opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Home
            </Button>
            <Button component={Link} to="/products" color="inherit" sx={{ fontWeight: 600, opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Products
            </Button>
            <Button component={Link} to="/about" color="inherit" sx={{ fontWeight: 600, opacity: 0.8, '&:hover': { opacity: 1 } }}>
              About
            </Button>
            <Button component={Link} to="/contact" color="inherit" sx={{ fontWeight: 600, opacity: 0.8, '&:hover': { opacity: 1 } }}>
              Contact
            </Button>
          </Box>

          {/* SEARCH */}
          <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
            <SearchIconWrapper>
              <SearchIcon size={18} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* ICONS */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton component={Link} to="/cart" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>
              <Badge badgeContent={cartItemsCount} color="primary" sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}>
                <ShoppingCartIcon size={24} />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <Tooltip title="User Profile">
                    <IconButton onClick={handleUserMenuOpen} sx={{ p: 0.5, border: '2px solid', borderColor: 'divider' }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem', fontWeight: 700 }}>
                            {user?.name?.[0]?.toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={userAnchorEl}
                    open={Boolean(userAnchorEl)}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            minWidth: 200,
                            borderRadius: 3,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle1" fontWeight={700}>{user?.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleUserMenuClose} component={Link} to="/profile" sx={{ gap: 1.5, py: 1.2 }}>
                        <User size={18} /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleUserMenuClose} component={Link} to="/orders" sx={{ gap: 1.5, py: 1.2 }}>
                        <ShoppingBag size={18} /> Orders
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logoutHandler} sx={{ gap: 1.5, py: 1.2, color: 'error.main' }}>
                        <LogOut size={18} /> Logout
                    </MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="contained" 
                size="small"
                startIcon={<PersonAddIcon size={18} />}
                sx={{ 
                    ml: 1, 
                    display: { xs: 'none', md: 'flex' },
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 700
                }}
              >
                Sign In
              </Button>
            )}

            {/* HAMBURGER (Mobile) */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon size={24} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: 3,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
                    border: '1px solid',
                    borderColor: 'divider'
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                <MenuItem component={Link} to="/products" onClick={handleMenuClose}>Products</MenuItem>
                <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About Us</MenuItem>
                <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>Contact Us</MenuItem>
                {!isAuthenticated && (
                   <MenuItem component={Link} to="/login" onClick={handleMenuClose} sx={{ color: 'primary.main', fontWeight: 700 }}>Sign In</MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
