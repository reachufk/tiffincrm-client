import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';

export const Banner = () => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        setBanners([
            {
                name: '',
                url: ''
            },
            {
                name: '',
                url: ''
            },
            {
                name: '',
                url: ''
            }
        ])
    }, []);

    return (
        <>
            <Carousel fade interval={1000} indicators={false} style={{ height: "32vh" }}>
                {
                    banners.map((banner, index) => (
                        <Carousel.Item key={index} style={{ height: "32vh" }} >
                            <img
                                className="d-block w-100"
                                src={`https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg`}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First_{index} slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </>

    )
}