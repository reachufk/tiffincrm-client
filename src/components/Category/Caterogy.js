import { useState, useEffect } from "react";
import { Grid, Switch, Box } from '@mui/material';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useParams } from "react-router-dom";

export const Category = () => {
    const [items, setItems] = useState(['itemA', 'itemB', 'itemC', 'itemD', 'itemE', 'itemF', 'itemyG']);
    const x = useParams();

    useEffect(() => {
        //   PostService.getAllPublicPosts().then(
        //     (response) => {
        //       setPosts(response.data);
        //     },
        //     (error) => {
        //       console.log(error);
        //     }
        //   );
        // }, []);
        // setCategories([])
    }, [])

    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        const { checked } = event.target;
        setChecked(checked);
        if (checked) {
            setItems(['itemA', 'itemB', 'itemC', 'itemD', 'itemE', 'itemF', 'itemyG']);
        } else {
            setItems(['itemA', 'itemB', 'itemC', 'itemD', 'itemE', 'itemF', 'itemyG']);
        }
    };

    const handleItemClick = () => {

    };

    return (
        <>
            {/* <Switch checked={checked} onChange={handleChange} /> */}
            {/* <span>Veg</span> */}
            <Box sx={{ flexGrow: 1, marginTop: '1vh' }}>
                <Grid container spacing={1}>
                    {
                        items.map((categoryItem, index) => (
                            <Grid key={index} item xs={6} md={3} onClick={() => handleItemClick({
                                categoryItem,
                                id: index
                            })} >
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/static/images/cards/contemplative-reptile.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {categoryItem}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    );
};