import React from "react";
// import MediaQuery from "react-responsive";
import ReactPlayer from 'react-player'

import {Media, Grid, Row, Col} from "react-bootstrap"


const Homepage = (props) => {
    return (
        <Grid fluid>
            <div className="margin-top-20">
                <Row>
                    <Col mdOffset={props.showMenu ? 2 : null}>
                        <ReactPlayer url="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0040190.MP4" playing loop volume={0} width={1400} height={750} />

                        <h1>Highlights</h1>
                        <Media>
                            <Media.Left>
                                <img src="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0012668.JPG"
                                     width={128} height={128} alt="indiaPhoto"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Check it Out!</Media.Heading>
                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                    felis in faucibus.</p>
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <img src="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0012668.JPG"
                                     width={128} height={128} alt="indiaPhoto"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Cool Stuff!</Media.Heading>
                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                    felis in faucibus.</p>
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <img src="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0012668.JPG"
                                     width={128} height={128} alt="indiaPhoto"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Check it Out!</Media.Heading>
                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                    felis in faucibus.</p>
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <img src="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0012668.JPG"
                                     width={128} height={128} alt="indiaPhoto"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Cool Stuff!</Media.Heading>
                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                    felis in faucibus.</p>
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <img src="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0012668.JPG"
                                     width={128} height={128} alt="indiaPhoto"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Check it Out!</Media.Heading>
                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                    felis in faucibus.</p>
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <img src="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0012668.JPG"
                                     width={128} height={128} alt="indiaPhoto"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Cool Stuff!</Media.Heading>
                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                    felis in faucibus.</p>
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <img src="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0012668.JPG"
                                     width={128} height={128} alt="indiaPhoto"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Check it Out!</Media.Heading>
                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                    felis in faucibus.</p>
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <img src="https://s3-us-west-1.amazonaws.com/rohan-pictures/India/G0012668.JPG"
                                     width={128} height={128} alt="indiaPhoto"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Cool Stuff!</Media.Heading>
                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                    felis in faucibus.</p>
                            </Media.Body>
                        </Media>

                    </Col>
                </Row>
            </div>
        </Grid>


    )
}
export default Homepage
