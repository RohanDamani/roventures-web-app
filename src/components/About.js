import React from 'react';
import { Col, Button, Glyphicon } from 'react-bootstrap';

class About extends React.Component {
  render() {
      const { history } = this.props
    return (
      <div>
        <Col xs={10} xsOffset={1} className={'text-container'}>
          <p>I wanted a way to store my photos and videos with the ability to view, share, and control all aspects - automating compression, resizing, and other effects on upload - so, I built this serverless viewer.</p>
          <p>The viewer itself is a single page application (SPA) built with JavaScript (ReactJS - React Router, Redux, Thunk, et al).  The SPA is hosted on AWS S3 as a static website, using Amazon Cognito to authenticate to a bucket containing all the media.</p>
          <p>This is an initial (unreleased) version, plenty more features to come.  Next will be upload hooks with lambda, email notifications, user authenticated sections, and more!  Please send me an email at damanirohan@gmail.com for more information, or visit the link at the bottom.</p>
        </Col>
          <Col md={2} mdOffset={1} className="text-left hidden-xs hidden-sm"><Button bsStyle="link" bsSize="large" onClick={() => history.goBack()}><Glyphicon glyph="arrow-left" /> Back</Button></Col>
          <Col md={3} mdOffset={5} className="text-right hidden-xs hidden-sm"><Button bsStyle="link" bsSize="large" href='http://rohandamani.com' target="_blank">rohandamani.com</Button></Col>
          <Col xs={10} xsOffset={1} className="text-center hidden-md hidden-lg"><Button bsStyle="link" bsSize="large" href='http://rohandamani.com' target="_blank">rohandamani.com</Button></Col>
          <Col xs={10} xsOffset={1} className="text-center hidden-md hidden-lg"><Button bsStyle="link" bsSize="large" onClick={() => history.goBack()}><Glyphicon glyph="arrow-left" /> Back</Button></Col>
      </div>
    );
  }
}

export default About;
