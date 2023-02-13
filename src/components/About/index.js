
import { Row, Col, Card } from 'react-bootstrap';
import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const About = () => {
    return (
        <div style={{ background: '#f5f5f5' }}>

            <Row style={{ textAlign: 'center', marginTop: '8px' }}>
                <Col>Logo</Col>
            </Row>
            <Row style={{ textAlign: 'center', marginTop: '8px' }}>
                <Col>
                    <h2 className='animate__animated animate__flip animate__slow'>KASHMIR IN A TIFFIN</h2>
                </Col>
            </Row>
            <Row style={{ textAlign: 'center', marginTop: '8px', color: '#64ce64' }}>
                <Col>
                    <h4 className='animate__animated animate__rollIn'>Mission</h4>
                </Col>
            </Row>
            <Row style={{ textAlign: 'center', marginTop: '8px', color: '#64ce64' }}>
                <Col className='animate__animated animate__rollIn'>
                    <p>Delivers hot plates of home made meals</p>
                </Col>
            </Row>
            <Row className="animate__animated  animate__zoomIn my-2">
                <Col>
                    <Card style={{ width: '100%', height: '22vh' }}>
                        <Card.Body>
                            <Card.Text>
                                To encourage healthy food habits in the valley.mandatory and right of every person to know about the food
                                which they are eating.Kashmir's first affordable tiffin service started in February 2020, Tiffin Aaw ( your meal is here) is Kashmir’s
                                first affordable tiffin service that currently operates in Srinagar.
                                Kashmir's first affordable tiffin service started in February 2020, Tiffin Aaw ( your meal is here) is Kashmir’s
                                first affordable tiffin service that currently operates in Srinagar.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='animate__animated animate__zoomIn'>
                    <Card style={{ width: '100%', height: '22vh' }}>
                        <Card.Body>
                            <Card.Text>
                                We believed that the race for fast food needed to be replaced by healthier, better and safer homemade
                                Kashmiri food. Each one of us has a right to safe and healthy food and we in Kashmir are mostly denied this right by
                                unscrupulous elements who sell adulterated spices, condiments, edible oil etc.We have been making both vegetarian and non vegetarian on a daily basis.
                                Our satisfaction lies in the fact
                                that you can eat the food without any fear with your family.These dishes are fresh, safe, hygienic
                                and healthy.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='animate__animated animate__zoomIn my-2'>
                <Col>
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Text>
                                Most of our customers are doctors, paramedic staff etc. who stand by the purity of the food served to them.
                                All ingredients are sourced locally. Our spices are bought locally and blended at home; everything is seasonal
                                and local. As a small enterprise, our idea is to empower other small enterprises as well. we are well aware.that
                                damage that ingredients like MSG or synthetic food colours can do to your stomach. The impact is teffing.
                                The Valley is facing a rise in lifestyle diseases.
                                We don't use fridge in our kitchen for leftovers to ensure the food is cooked fresh every siAgle. day. In the
                                evening, leftovers are shared with the needy. Our only mantra is to keep the food simpleawith the ethnic
                                touch of homemade kitchen recipes thereby maintaining the taste of traditional CuiSines of Kashaair
                                vegetarian and non-vegetarian food.
                                Whether it's in the unforgiving winter or to areas where vehicles cannot reaéh «tiffin aaw.bas continued to
                                deliver every single day.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col><Col className='animate__animated animate__zoomIn'>
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Text>
                                Tiffin aaw has already won awards and recognition in a short span-Despité being-asmall Start Up, Tiffin aaw
                                has already conducted campaigns during the*pandemic like ‘food for Kashmir
                                Food for kashmir was an initiative by tiffin aaw, Where wé invited people to sponsor homemade food for
                                underprivileged And distressed covid positives. Weaanaged to serve 22 thousand meals in all the covid
                                hospitals of Srinagar. It was good to see lot of pegple coming together in those testing times working as
                                one and being ditivén by ideas from Gach other.Be it your official or private parties, meetings Omget-togethers,
                                allow Tiffin Aaw a chance to serve you the
                                best.Home away home? Staying in hospital or hostel?employee/Student/ Shopkeeper? Staying at offtice/ health
                                care professional? Patient attendant? meetings?Now your problem won't go unattended. Because
                                TiffirP-Aaw is ready to serve. Affordable, easy, and fresh food.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div >
    );
};