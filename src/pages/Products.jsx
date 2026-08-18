import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, removeErrors } from "../features/products/productSlice";
import { toast } from "react-toastify";

import {
  Container,
  Typography,
  Box,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
  Grid
} from "@mui/material";
import { Search, Filter, X } from "lucide-react";

import PageTitle from "../components/PageTitle";
import Product from "../components/Product";
import Loader from "../components/Loader";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
];

const Products = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    products,
    totalPages,
  } = useSelector((state) => state.product);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        getProducts({
          keyword,
          page: currentPage,
          price: priceRange,
          category,
          resultsPerPage: 8,
        })
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, keyword, currentPage, priceRange, category]);

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

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setKeyword("");
    setCategory("");
    setPriceRange([0, 250000]);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ pb: 10 }}>
      <PageTitle title="Browse Products - ShopEasy" />
      
      <Container maxWidth="xl">
        <Box sx={{ py: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
            Our Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore our curated collection of high-quality products.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* FILTERS SIDEBAR */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                border: '1px solid', 
                borderColor: 'divider',
                position: 'sticky',
                top: 100
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Filter size={20} />
                  <Typography variant="h6" fontWeight={700}>Filters</Typography>
                </Stack>
                {(keyword || category || priceRange[0] !== 0 || priceRange[1] !== 250000) && (
                  <IconButton size="small" onClick={resetFilters} sx={{ color: 'primary.main' }}>
                    <X size={18} />
                  </IconButton>
                )}
              </Stack>

              <Stack spacing={4}>
                {/* Search */}
                <Box>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Search</Typography>
                  <TextField
                    placeholder="Search name..."
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={keyword}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setKeyword(e.target.value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search size={16} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Box>

                <Divider />

                {/* Category */}
                <Box>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Category</Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      displayEmpty
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setCurrentPage(1);
                      }}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Divider />

                {/* Price Range */}
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight={700}>Price Range</Typography>
                    <Typography variant="caption" color="primary.light" fontWeight={700}>
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                    </Typography>
                  </Stack>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={250000}
                    size="small"
                    sx={{ color: 'primary.main' }}
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">₹0</Typography>
                    <Typography variant="caption" color="text.secondary">₹2.5L+</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* PRODUCTS GRID */}
          <Grid size={{ xs: 12, md: 9 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
                <Loader />
              </Box>
            ) : (
              <Box>
                <Grid container spacing={3}>
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <Grid
                        key={product._id}
                        size={{ xs: 12, sm: 6, lg: 4 }}
                      >
                        <Product product={product} />
                      </Grid>
                    ))
                  ) : (
                    <Grid size={{ xs: 12 }}>
                      <Paper sx={{ py: 15, textAlign: 'center', borderRadius: 4, bgcolor: 'transparent', border: '1px dashed', borderColor: 'divider' }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={600}>
                          No products found matching your filters
                        </Typography>
                        <Button variant="text" onClick={resetFilters} sx={{ mt: 2 }}>
                          Clear all filters
                        </Button>
                      </Paper>
                    </Grid>
                  )}
                </Grid>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 8,
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          borderRadius: 2,
                          fontWeight: 700
                        }
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
