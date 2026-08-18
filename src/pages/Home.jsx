import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, removeErrors } from "../features/products/productSlice.js";
import { toast } from "react-toastify";

import { Container, Typography, Box, Fade, Grid } from "@mui/material";

import ImageSidler from "../components/imageSider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.product
  );

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    dispatch(
      getProducts({
        keyword: "",
        page: 1,
        resultsPerPage: 10,
      })
    );
  }, [dispatch]);

  /* ================= ERROR HANDLING ================= */
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  /* ================= LOADING ================= */
  if (loading) return <Loader />;

  return (
    <Box sx={{ pb: 8 }}>
      <PageTitle title="Home - ShopEasy" />
      <Fade in={true} timeout={800}>
        <Box>
          <ImageSidler />
        </Box>
      </Fade>

      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            fontWeight={800} 
            sx={{ 
              mb: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'primary.main'
            }}
          >
            Trending Now
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover our most popular and curated products
          </Typography>
          <Box 
            sx={{ 
              width: 60, 
              height: 4, 
              bgcolor: 'primary.main', 
              mx: 'auto', 
              mt: 2,
              borderRadius: 2 
            }} 
          />
        </Box>

        <Grid container spacing={4}>
          {products && products.length > 0 ? (
            products.map((prod) => (
              <Grid
                key={prod._id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              >
                <Product product={prod} />
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography align="center" color="text.secondary" sx={{ py: 10 }}>
                No products found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
