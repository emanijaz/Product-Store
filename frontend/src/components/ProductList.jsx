import React, {useState, useEffect} from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faShoppingBag, faRing, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ProductSkeleton from './ProductSkeleton';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none', // Remove box shadow
    transition: 'background-color 0.3s', // Add transition for smooth color change
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#25303b' : '#f5f5f5', // Change background color on hover
    },
}));

export default function ProductList() {
    const [selectedCategory, setSelectedCategory] = useState({ id: 1, icon: <PhoneAndroidIcon fontSize="small" />, text: 'Mobile' });
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCategoryItemClick = (item) => {
        setSelectedCategory(item);
    };

    const handlePriceItemClick = (item) => {
        const isSelected = selectedPrices.some(priceRange => 
            JSON.stringify(priceRange) === JSON.stringify(item.range)
        );
        
        let newSelected = [];
        if (!isSelected) {
            // If the range is not already selected, add it to the selectedPrices array
            newSelected = [...selectedPrices, item.range];
        } else {
            // If the range is already selected, remove it from the selectedPrices array
            newSelected = selectedPrices.filter(priceRange => {
                return JSON.stringify(priceRange) !== JSON.stringify(item.range)
            });   
        
        }
        setSelectedPrices(newSelected);
    };


    function FormRow() {   
        
        
        return products.map((product, index) => {
            if (index % 4 === 0) {
                return (
                <React.Fragment>
                    <Grid item xs={4} className='border-0'>
                            <Item>
                                <Link to={`/product/${product._id}`} key={product._id} className='col-md-3 mt-3 mb-1' style={{textDecoration: "none"}}>
                                    <div className="card h-100 text-center border-0" style={{ width: "18rem", backgroundColor: "transparent" }}>
                                        <img className="card-img-top mt-3" src={`${product.images[0].url}`} alt="Android 1" style={{ height: "250px"}} />
                                        <div className="card-body">
                                            <p className="card-text" style={{ fontSize: "16px" }}>{product.name}</p>
                                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>{product.price}</p>
                                            
                                        </div>  
                                    </div>
                                </Link>
                            </Item>
                    </Grid>
    
                    {products.slice(index + 1, index + 4).map((nextProduct) => (
                        <Grid id={nextProduct._id} item xs={4} className='border-0'>
                            <Item>
                                    <Link to={`/product/${nextProduct._id}`} key={product._id} className='col-md-3 mt-3 mb-1' style={{textDecoration: "none"}}>
                                        <div className="card h-100 text-center border-0" style={{ width: "18rem", backgroundColor: "transparent" }}>
                                        <img className="card-img-top mt-3" src={`${nextProduct.images[0].url}`} alt="Android 1" style={{ height: "250px"}} />
                                        <div className="card-body">
                                            <p className="card-text" style={{ fontSize: "16px" }}>{nextProduct.name}</p>
                                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>{nextProduct.price}</p>
                                            
                                        </div>
                                        </div>
                                    </Link>
                            </Item>
                        </Grid>
                    ))}
                </React.Fragment>
                );
            }
            return null;
        })
        
    }

    useEffect(()=> {
        const fetchAllProducts = async()=>{
            try{
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/products/',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if(data.success){
                    const filteredProducts = data.products.filter(product => {
                        const categoryMatch = selectedCategory ? product.category === selectedCategory.text : true;
                        const priceMatch = selectedPrices.length === 0 || selectedPrices.some(priceRange => {
                            return product.price >= priceRange[0] && product.price <= priceRange[1];
                        });
                        return categoryMatch && priceMatch;
                    });
                    setLoading(false);
                    setProducts(filteredProducts);
                    
                }
            }
            catch(error){
                console.error('Error fetching products:', error);
            }
        }

        fetchAllProducts();
    },[selectedCategory,selectedPrices])

    if (loading) {
        return (
            <div>
                <Container maxWidth="30">
                    <Box sx={{  height: '100vh', paddingTop: '2%', px: "5%", flexGrow: 1}}>
                        <Grid container spacing={6} columns={12}>
                            {[...Array(8)].map((_, index) => (
                                <Grid key={index} item xs={4} className='border-0'>
                                    <Grid item xs={9}>
                            
                                        <Grid container>
                                            <Item>
                                                <ProductSkeleton key={index} />
                                            </Item>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))
                            }
                        </Grid>
                    </Box>
                </Container>
            </div>
        );
    }
    return (
        <>
            <Navbar />
            <Container maxWidth="30">
                <h3 className='d-md-flex justify-content-center mt-5 mb-3'>Product List </h3>
                <Box sx={{  height: '100vh', paddingTop: '2%', px: "7%", flexGrow: 1}}>
                    <Grid container spacing={6} columns={12}>
                        <Grid item xs={3}>
                            <Item>
                                <Typography variant="h6">Categories</Typography>
                                <Divider style={{ height: '1.2rem' }}></Divider>
                                <List
                                    sx={{ width: '100%', backgroundColor: "transparent"}}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    
                                >
                                    {[
                                    { id: 1, icon: <PhoneAndroidIcon fontSize="small" />, text: 'Mobile' },
                                    { id: 2, icon: <FontAwesomeIcon icon={faShirt} />, text: 'Shirt' },
                                    { id: 3, icon: <FontAwesomeIcon icon={faShoppingBag} />, text: 'Bag' },
                                    { id: 4, icon: <FontAwesomeIcon icon={faShoePrints} />, text: 'Shoe' },
                                    { id: 5, icon: <FontAwesomeIcon icon={faRing} />, text: 'Ring' },
                                    ].map((item) => (
                                    <ListItemButton
                                        key={item.id}
                                        onClick={() => handleCategoryItemClick(item)}
                                        style={{ color: selectedCategory && selectedCategory.id === item.id ? 'black' : 'grey', fontWeight: selectedCategory && selectedCategory.id === item.id ? "bold" : "normal"  }}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                variant="body2"
                                                style={{color: selectedCategory && selectedCategory.id === item.id ? 'black' : 'grey', }}
                                            >
                                                {item.text}
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                    ))}
                                </List>
                            </Item>
                            <Item>
                                <Typography variant="h6">Filter By Price</Typography>
                                <Divider style={{ height: '1.2rem' }}></Divider>
                                
                                <List
                                    sx={{ width: '100%', backgroundColor: "transparent"}}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                >
                                    {[
                                    { id: 1, range: [0,100] },
                                    { id: 2, range: [100,200] },
                                    { id: 3, range: [200,350] },
                                    { id: 4, range: [350,500] },
                                    { id: 5, range: [500,1200] },
                                    ].map((item) => (
                                    <ListItemButton
                                        key={item.id}
                                        onClick={() => handlePriceItemClick(item)}
                                        style={{ color: selectedPrices.some(priceRange => JSON.stringify(priceRange) === JSON.stringify(item.range)) ? 'black' : 'grey',  }}>
                                        <ListItemIcon>
                                            <Checkbox
                                                checked={selectedPrices.some(priceRange => 
                                                    JSON.stringify(priceRange) === JSON.stringify(item.range))}
                                                onChange={() => handlePriceItemClick(item)}
                                                size="small"
                                            />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                variant="body2"
                                                style={{color: selectedPrices.some(priceRange => 
                                                    JSON.stringify(priceRange) === JSON.stringify(item.range)) ? 'black' : 'grey', }}
                                            >
                                                ${item.range[0]} - ${item.range[1]} 
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                    ))}
                                </List>
                            </Item>
                        </Grid>
                        <Grid item xs={9}>
                            
                                <Grid container>
                                
                                
                                
                                { products.length === 0 &&
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10%" }}>
                                            <img src="/assets/noProduct.jpg" alt="No Products found" style={{ width: "400px", height: "400px" }} />
                                            <p className="font-weight-bold">No products found</p> {/* Show loading message */}
                                        </div> 
                                }
                                {
                                    products.length > 0 && (
                                
                                    <FormRow /> )
                                }
                                
                                </Grid>
                            
                        </Grid>
                        
                    </Grid>
                </Box>
        </Container>
            
        </>
    )
}
