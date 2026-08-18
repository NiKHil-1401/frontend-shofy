import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, removeErrors } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Container,
  Typography,
  Box,
  Button,
  Rating,
  IconButton,
  Divider,
  TextField,
  Breadcrumbs,
  Link,
  Paper,
  Stack,
  Chip,
  Fade,
  Grid,
  Skeleton,
  Avatar,
  Tooltip,
  Badge
} from "@mui/material";
import {
  Trash2,
  Edit3,
  Minus,
  Plus,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Truck,
  RotateCcw
} from "lucide-react";
import Loader from "../components/Loader";
import NoProducts from "../components/NoProducts";
import PageTitle from "../components/PageTitle";

const ProductSkeleton = () => (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    <Skeleton variant="text" width={200} height={30} sx={{ mb: 4 }} />
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: 4 }} />
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" width={80} height={80} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="30%" height={40} sx={{ mb: 4 }} />
        <Skeleton variant="text" width="90%" height={100} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: 2, mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: 2 }} />
      </Grid>
    </Grid>
  </Container>
);

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.product);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const reviews = product?.reviews || [];

  useEffect(() => {
    dispatch(getProductDetails(id));

    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, id]);

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  // Safe image normalization
  const rawImages = product?.images || product?.image || [];
  const images = Array.isArray(rawImages)
    ? rawImages.map((img) => (typeof img === "string" ? { url: img } : img)).filter(Boolean)
    : [{ url: "/placeholder.jpg" }];

  const getImageSrc = (img) => {
    if (!img?.url) return "/placeholder.jpg";
    if (img.url.startsWith("http")) return img.url;
    if (img.url.startsWith("/")) return img.url;
    // If it's a relative path like 'uploads/image.png', we might need to prepend /
    return `/${img.url.replace(/^\.\//, "")}`;
  };

  const submitReview = async () => {
    if (newRating === 0 || !newComment.trim()) {
      toast.error("Please provide both a rating and a comment");
      return;
    }

    try {
      await axios.put("/api/v1/review", {
        productId: id,
        rating: newRating,
        comment: newComment,
        reviewId: editingReviewId,
      });

      dispatch(getProductDetails(id));
      setNewRating(0);
      setNewComment("");
      setEditingReviewId(null);
      toast.success(editingReviewId ? "Review updated!" : "Review submitted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving review");
    }
  };

  const startEdit = (review) => {
    setNewRating(review.rating);
    setNewComment(review.comment);
    setEditingReviewId(review._id);
    document.getElementById("review-form-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const cancelEdit = () => {
    setNewRating(0);
    setNewComment("");
    setEditingReviewId(null);
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(`/api/v1/reviews?productId=${id}&id=${reviewId}`);
      dispatch(getProductDetails(id));
      toast.success("Review deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting review");
    }
  };

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product._id || product.id,
        name: product.name,
        price: product.price,
        image: getImageSrc(images[0]),
        stock: product.stock,
        quantity,
      })
    );
    toast.success("Item Added To Cart");
  };

  if (loading) return <ProductSkeleton />;

  if (error || !product) {
    return <NoProducts message={error || "Product not found."} />;
  }

  const discount = 20; // Example discount percentage
  const originalPrice = product.price / (1 - discount / 100);

  return (
    <Box sx={{ pb: 10, bgcolor: 'background.default', minHeight: '100vh' }}>
      <PageTitle title={`${product.name} - ShopEasy`} />
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<ChevronRight size={14} />} 
          sx={{ py: 3, '& .MuiBreadcrumbs-li': { color: 'text.secondary', fontSize: '0.875rem' } }}
        >
          <Link component={RouterLink} to="/" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            Home
          </Link>
          <Link component={RouterLink} to="/products" underline="hover" color="inherit">
            Products
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Images Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Paper 
                elevation={0}
                sx={{ 
                  borderRadius: 6, 
                  overflow: 'hidden', 
                  bgcolor: 'background.paper',
                  position: 'relative',
                  aspectRatio: { xs: '1/1', md: '4/5', lg: '1/1' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              >
                {isImageLoading && (
                  <Skeleton variant="rectangular" width="100%" height="100%" sx={{ position: 'absolute' }} />
                )}
                <Fade in={!isImageLoading} timeout={500}>
                  <Box
                    component="img"
                    src={getImageSrc(images[currentImageIndex])}
                    alt={product.name}
                    onLoad={() => setIsImageLoading(false)}
                    sx={{ 
                      maxWidth: '95%', 
                      maxHeight: '95%', 
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                </Fade>

                {images.length > 1 && (
                  <>
                    <IconButton
                      onClick={() => {
                        setIsImageLoading(true);
                        setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
                      }}
                      sx={{ 
                        position: 'absolute', 
                        left: 15, 
                        bgcolor: 'background.paper', 
                        backdropFilter: 'blur(8px)',
                        boxShadow: 2,
                        '&:hover': { bgcolor: 'primary.main', color: 'white' } 
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsImageLoading(true);
                        setCurrentImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
                      }}
                      sx={{ 
                        position: 'absolute', 
                        right: 15, 
                        bgcolor: 'background.paper', 
                        backdropFilter: 'blur(8px)',
                        boxShadow: 2,
                        '&:hover': { bgcolor: 'primary.main', color: 'white' } 
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </>
                )}
                
                <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
                  <Chip 
                    label="Free Shipping" 
                    size="small" 
                    color="success" 
                    variant="filled"
                    icon={<Truck size={14} />}
                    sx={{ fontWeight: 700, borderRadius: 1.5 }}
                  />
                </Box>
              </Paper>

              {images.length > 1 && (
                <Stack 
                  direction="row" 
                  spacing={2} 
                  sx={{ 
                    mt: 3, 
                    overflowX: 'auto', 
                    pb: 1,
                    '&::-webkit-scrollbar': { height: 4 },
                    '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 2 }
                  }}
                >
                  {images.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => {
                        if (idx !== currentImageIndex) {
                          setIsImageLoading(true);
                          setCurrentImageIndex(idx);
                        }
                      }}
                      sx={{
                        minWidth: 80,
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: idx === currentImageIndex ? 'primary.main' : 'transparent',
                        transition: 'all 0.2s',
                        p: 0.5,
                        bgcolor: 'background.paper',
                        '&:hover': { borderColor: 'primary.light', transform: 'translateY(-2px)' }
                      }}
                    >
                      <img 
                        src={getImageSrc(img)} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
          </Grid>

          {/* Product Info Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip 
                  label={product.category} 
                  color="primary" 
                  size="small" 
                  sx={{ fontWeight: 700, borderRadius: 1.5, textTransform: 'uppercase', letterSpacing: 0.5 }} 
                />
                <Chip 
                  label="Featured" 
                  variant="outlined"
                  size="small" 
                  sx={{ fontWeight: 600, borderRadius: 1.5 }} 
                />
              </Stack>
              
              <Typography variant="h2" sx={{ mb: 2, lineHeight: 1.1, fontSize: { xs: '2.5rem', lg: '3.5rem' } }}>
                {product.name}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Rating value={averageRating} precision={0.5} readOnly sx={{ color: 'secondary.main' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, ml: 1 }}>
                    {averageRating.toFixed(1)}
                  </Typography>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {reviews.length} Customer Reviews
                </Typography>
              </Stack>

              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: 'rgba(99, 102, 241, 0.05)', border: '1px solid', borderColor: 'primary.dark', mb: 4 }}>
                <Stack direction="row" alignItems="baseline" spacing={2}>
                  <Typography variant="h3" color="primary.light" fontWeight={800}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </Typography>
                  <Typography variant="h5" sx={{ textDecoration: 'line-through', color: 'text.secondary', opacity: 0.6, fontWeight: 500 }}>
                    ₹{originalPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </Typography>
                  <Chip label={`${discount}% OFF`} color="secondary" size="small" sx={{ fontWeight: 800, borderRadius: 1 }} />
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Inclusive of all taxes
                </Typography>
              </Paper>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {product.description}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 5 }}>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(34, 197, 94, 0.1)', color: 'success.main' }}>
                      <ShieldCheck size={20} />
                    </Box>
                    <Typography variant="caption" fontWeight={600}>1 Year Warranty</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(236, 72, 153, 0.1)', color: 'secondary.main' }}>
                      <RotateCcw size={20} />
                    </Box>
                    <Typography variant="caption" fontWeight={600}>30 Day Return</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main' }}>
                      <CheckCircle2 size={20} />
                    </Box>
                    <Typography variant="caption" fontWeight={600}>Verified Product</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 4 }} />

              <Stack spacing={4}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      Select Quantity
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color={product.stock > 0 ? "success.main" : "error.main"} 
                      sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      {product.stock > 0 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {product.stock > 0 ? `${product.stock} items in stock` : "Out of stock"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ width: 'fit-content', border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 0.75, bgcolor: 'background.paper' }}>
                    <IconButton 
                      size="small" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                      disabled={quantity <= 1 || product.stock === 0}
                      sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                      <Minus size={18} />
                    </IconButton>
                    <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 800, fontSize: '1.1rem' }}>{quantity}</Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} 
                      disabled={quantity >= product.stock || product.stock === 0}
                      sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                      <Plus size={18} />
                    </IconButton>
                  </Stack>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<ShoppingCart size={22} />}
                    onClick={addToCartHandler}
                    sx={{ 
                      flexGrow: 2, 
                      py: 2, 
                      borderRadius: 3, 
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 25px rgba(99, 102, 241, 0.4)' }
                    }}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                  <Tooltip title="Add to Wishlist">
                    <Button 
                      variant="outlined" 
                      size="large" 
                      sx={{ 
                        px: 3, 
                        py: 2, 
                        borderRadius: 3,
                        borderColor: 'divider',
                        '&:hover': { borderColor: 'secondary.main', color: 'secondary.main', bgcolor: 'rgba(236, 72, 153, 0.05)' }
                      }}
                    >
                      <Heart size={22} />
                    </Button>
                  </Tooltip>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box id="review-section" sx={{ mt: 15 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 6 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="h3" fontWeight={800} textAlign="center">
              Customer Reviews
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Stack>

          <Grid container spacing={6}>
            {/* Review Stats & Form */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={4} sx={{ position: 'sticky', top: 100 }}>
                <Paper sx={{ p: 4, borderRadius: 5, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                    Review Summary
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h1" fontWeight={900} color="primary.main" sx={{ lineHeight: 1 }}>
                        {averageRating.toFixed(1)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>OUT OF 5</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Rating value={averageRating} precision={0.5} readOnly size="large" sx={{ color: 'secondary.main', mb: 0.5 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Based on {reviews.length} verified reviews
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack spacing={1.5}>
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter(r => Math.round(r.rating) === star).length;
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <Stack key={star} direction="row" alignItems="center" spacing={2}>
                          <Typography variant="caption" fontWeight={700} sx={{ minWidth: 50 }}>{star} Stars</Typography>
                          <Box sx={{ flexGrow: 1, height: 6, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                            <Box sx={{ width: `${percentage}%`, height: '100%', bgcolor: 'secondary.main', borderRadius: 3 }} />
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ minWidth: 30, textAlign: 'right' }}>{count}</Typography>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Paper>

                <Paper id="review-form-section" sx={{ p: 4, borderRadius: 5, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    {editingReviewId ? <Edit3 size={20} /> : <Star size={20} />}
                    {editingReviewId ? "Edit Your Review" : "Write a Review"}
                  </Typography>
                  
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Your Rating</Typography>
                      <Rating 
                        value={newRating} 
                        onChange={(e, val) => setNewRating(val)} 
                        size="large" 
                        sx={{ color: 'secondary.main' }}
                      />
                    </Box>
                    <TextField 
                      multiline 
                      rows={4} 
                      fullWidth 
                      placeholder="Share your experience with this product..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      sx={{ 
                        '& .MuiOutlinedInput-root': { 
                          borderRadius: 3,
                          bgcolor: 'rgba(255,255,255,0.02)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' }
                        } 
                      }}
                    />
                    <Stack direction="row" spacing={2}>
                      <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={submitReview}
                        disabled={newRating === 0 || !newComment.trim()}
                        sx={{ py: 1.5, borderRadius: 2.5, fontWeight: 700 }}
                      >
                        {editingReviewId ? "Update Review" : "Post Review"}
                      </Button>
                      {editingReviewId && (
                        <Button variant="outlined" onClick={cancelEdit} sx={{ borderRadius: 2.5 }}>Cancel</Button>
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

            {/* Review List */}
            <Grid size={{ xs: 12, lg: 8 }}>
              {reviews.length === 0 ? (
                <Paper sx={{ p: 10, textAlign: 'center', borderRadius: 5, bgcolor: 'background.paper', border: '1px dashed', borderColor: 'divider' }}>
                  <Box sx={{ color: 'text.secondary', mb: 2 }}><Star size={48} style={{ opacity: 0.2 }} /></Box>
                  <Typography variant="h6" color="text.secondary">No reviews yet</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Be the first to share your thoughts about this product!
                  </Typography>
                </Paper>
              ) : (
                <Stack spacing={3}>
                  {reviews.map((rev) => (
                    <Fade in={true} key={rev._id}>
                      <Paper sx={{ p: 4, borderRadius: 5, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' } }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontWeight: 700 }}>
                              {(rev.name || "U")[0].toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={700}>{rev.name || "Verified Buyer"}</Typography>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Rating value={rev.rating} readOnly size="small" sx={{ color: 'secondary.main' }} />
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                  • {new Date().toLocaleDateString()}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                          <Box>
                            <IconButton size="small" onClick={() => startEdit(rev)} sx={{ color: 'info.main', '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.1)' } }}>
                              <Edit3 size={18} />
                            </IconButton>
                            <IconButton size="small" onClick={() => deleteReview(rev._id)} sx={{ color: 'error.main', '&:hover': { bgcolor: 'rgba(220, 38, 38, 0.1)' } }}>
                              <Trash2 size={18} />
                            </IconButton>
                          </Box>
                        </Stack>
                        <Typography variant="body1" sx={{ mt: 3, color: 'text.primary', lineHeight: 1.7, pl: { sm: 8.5 } }}>
                          {rev.comment}
                        </Typography>
                      </Paper>
                    </Fade>
                  ))}
                </Stack>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetails;
