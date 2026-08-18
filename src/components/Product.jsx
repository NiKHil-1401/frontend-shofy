import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
} from "@mui/material";

const Product = ({ product }) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Category Chip */}
      <Chip 
        label={product?.category} 
        size="small"
        sx={{ 
          position: 'absolute', 
          top: 12, 
          left: 12, 
          zIndex: 1,
          bgcolor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          color: 'primary.light',
          fontWeight: 600,
          fontSize: '0.65rem',
          textTransform: 'uppercase'
        }}
      />

      <CardActionArea 
        component={Link} 
        to={`/product/${product._id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative', pt: '100%', bgcolor: '#f1f5f9' }}>
          <CardMedia
            component="img"
            image={product?.image?.[0]?.url || "/placeholder.jpg"}
            alt={product?.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: "contain",
              p: 2,
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontSize: '1rem',
              fontWeight: 700,
              lineHeight: 1.3,
              height: "2.6em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1
            }}
          >
            {product?.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
            <Rating 
              value={product?.ratings || 0} 
              precision={0.5} 
              readOnly 
              size="small" 
              sx={{ color: 'secondary.main' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              ({product?.numOfReviews || 0})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.light' }}>
              ₹{product?.price?.toLocaleString("en-IN")}
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ 
                minWidth: 0, 
                p: 1, 
                borderRadius: 2,
                borderColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                    bgcolor: 'primary.main',
                    borderColor: 'primary.main',
                    color: 'white'
                }
              }}
            >
              <ShoppingCart size={18} />
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
