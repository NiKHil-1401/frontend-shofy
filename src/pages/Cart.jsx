import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  Paper,
  Stack,
  Grid,
  Breadcrumbs,
  Link,
  Tooltip,
  Avatar
} from "@mui/material";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ChevronRight, 
  ArrowRight, 
  CreditCard, 
  ShoppingBag,
  ArrowLeft
} from "lucide-react";
import PageTitle from "../components/PageTitle";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addToCart({ id, quantity: newQty }));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addToCart({ id, quantity: newQty }));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <PageTitle title="Your Cart - ShopEasy" />
        <Box 
          sx={{ 
            width: 120, 
            height: 120, 
            borderRadius: '50%', 
            bgcolor: 'rgba(99, 102, 241, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            border: '2px dashed',
            borderColor: 'primary.main'
          }}
        >
          <ShoppingBag size={50} className="text-indigo-500" />
        </Box>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Your Cart is Empty
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 500, mx: 'auto' }}>
          Looks like you haven't added anything to your cart yet. Explore our latest products and find something you love!
        </Typography>
        <Button
          component={RouterLink}
          to="/products"
          variant="contained"
          size="large"
          startIcon={<ArrowLeft size={20} />}
          sx={{ px: 4, py: 2, borderRadius: 3 }}
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shipping = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <Box sx={{ pb: 10, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageTitle title="Your Cart - ShopEasy" />
      <Container maxWidth="xl">
        <Breadcrumbs 
          separator={<ChevronRight size={14} />} 
          sx={{ py: 4, '& .MuiBreadcrumbs-li': { color: 'text.secondary', fontSize: '0.875rem' } }}
        >
          <Link component={RouterLink} to="/" underline="hover" color="inherit">Home</Link>
          <Typography color="text.primary" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Shopping Cart</Typography>
        </Breadcrumbs>

        <Typography variant="h3" fontWeight={800} sx={{ mb: 6 }}>
          My Cart <Typography component="span" variant="h3" color="primary.main">({cartItems.length} items)</Typography>
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Paper 
                  key={item.id}
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    borderRadius: 4, 
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s',
                    '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)' }
                  }}
                >
                  <Grid container spacing={3} alignItems="center">
                    <Grid size={{ xs: 12, sm: 2 }}>
                      <Box 
                        sx={{ 
                          width: '100%', 
                          aspectRatio: '1/1', 
                          borderRadius: 3, 
                          overflow: 'hidden', 
                          bgcolor: 'white',
                          p: 1
                        }}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography 
                        component={RouterLink} 
                        to={`/product/${item.id}`}
                        variant="h6" 
                        fontWeight={700}
                        sx={{ color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Category: {item.category || "General"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }}>
                      <Typography variant="h6" fontWeight={800} color="primary.light">
                        ₹{item.price.toLocaleString("en-IN")}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ width: 'fit-content', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 0.5 }}>
                        <IconButton size="small" onClick={() => decreaseQty(item.id, item.quantity)} sx={{ color: 'text.secondary' }}>
                          <Minus size={16} />
                        </IconButton>
                        <Typography sx={{ width: 30, textAlign: 'center', fontWeight: 700 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => increaseQty(item.id, item.quantity, item.stock)} sx={{ color: 'text.secondary' }}>
                          <Plus size={16} />
                        </IconButton>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 2 }}>
                      <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <IconButton 
                          onClick={() => removeCartItemHandler(item.id)}
                          sx={{ color: 'error.main', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                        >
                          <Trash2 size={20} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 5, 
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                top: 100
              }}
            >
              <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>Order Summary</Typography>
              
              <Stack spacing={2.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography fontWeight={700}>₹{subtotal.toLocaleString("en-IN")}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography fontWeight={700} color={shipping === 0 ? "success.main" : "text.primary"}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Estimated Tax (18%)</Typography>
                  <Typography fontWeight={700}>₹{tax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</Typography>
                </Stack>
                
                <Divider sx={{ my: 1 }} />
                
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h5" fontWeight={800}>Total</Typography>
                  <Typography variant="h5" fontWeight={800} color="primary.main">
                    ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </Typography>
                </Stack>

                <Box sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<CreditCard size={20} />}
                    onClick={checkoutHandler}
                    sx={{ 
                      py: 2, 
                      borderRadius: 3, 
                      fontSize: '1.1rem', 
                      fontWeight: 800,
                      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 25px rgba(99, 102, 241, 0.4)' }
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
                
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
                  <ShoppingBag size={16} className="text-slate-400" />
                  <Typography variant="caption" color="text.secondary">
                    Secure Checkout with ShopEasy Guarantee
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
