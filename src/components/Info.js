import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Glyphicon, Tabs, Tab } from 'react-bootstrap';
import { INFO } from '../utils/constants';
import EmailCapture from './EmailCapture';
import { authenticateDynamoDB } from '../utils/awsUtil';

class Info extends React.Component {
  componentWillMount() {
    // authenticate the AWS-SDK s3 bucket using AWS Cognito user pool
    this.dynamodb = authenticateDynamoDB;
  }
  render() {
    const { history } = this.props;
    return (
      <div>
        <Col xs={10} xsOffset={1} className="hidden-xs">
          <Tabs id="info-tabs" className='font-size-20' defaultActiveKey={2}>
              <Tab eventKey={1} className="text-container" title="About">
                  <p>{INFO.P_4}</p>
                  <p>{INFO.P_4_1}</p>
              </Tab>
            <Tab eventKey={2} className="text-container" title="Join">
              <p>{INFO.P_1}</p>
              <p>{INFO.P_5}</p>
              <EmailCapture dynamodb={this.dynamodb} />
            </Tab>
              <Tab eventKey={3} className="text-container" title="Tech">
                  <p>{INFO.P_2}</p>
                  <p>{INFO.P_3}</p>
              </Tab>
          </Tabs>
        </Col>
        <Col
          xs={12}
          className="small hidden-sm hidden-md hidden-lg"
        >
          <Tabs id="info-tabs" className='font-size-20' defaultActiveKey={2}>
              <Tab eventKey={1}  className="text-container" title="About">
                  <p>{INFO.P_4}</p>
                  <p>{INFO.P_4_1}</p>
              </Tab>
            <Tab eventKey={2}  className="text-container" title="Join">
              <p>{INFO.P_1}</p>
              <EmailCapture dynamodb={this.dynamodb} small />
              <p>{INFO.P_5}</p>
            </Tab>
              <Tab eventKey={3}  className="text-container" title="Tech">
                  <p>{INFO.P_2}</p>
                  <p>{INFO.P_3}</p>
              </Tab>
          </Tabs>
        </Col>
        <Col md={2} mdOffset={1} className="text-left hidden-xs hidden-sm">
          <Button
            bsStyle="link"
            bsSize="large"
            onClick={() => history.goBack()}
          >
            <Glyphicon glyph="arrow-left" /> Back
          </Button>
        </Col>
        <Col md={3} mdOffset={5} className="text-right hidden-xs hidden-sm">
          <Button
            bsStyle="link"
            bsSize="large"
            href={INFO.LINK}
            target="_blank"
          >
            {INFO.WEBSITE}
          </Button>
        </Col>
        <Col xs={10} xsOffset={1} className="text-center hidden-md hidden-lg">
          <Button
            bsStyle="link"
            bsSize="large"
            href={INFO.LINK}
            target="_blank"
          >
            {INFO.WEBSITE}
          </Button>
        </Col>
        <Col xs={10} xsOffset={1} className="text-center hidden-md hidden-lg">
          <Button
            bsStyle="link"
            bsSize="large"
            onClick={() => history.goBack()}
          >
            <Glyphicon glyph="arrow-left" /> Back
          </Button>
        </Col>
      </div>
    );
  }
}

Info.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Info;
