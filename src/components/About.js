import React from 'react';
import PropTypes from 'prop-types';
import {  Col, Button, Glyphicon } from 'react-bootstrap';
import { ABOUT } from '../utils/constants';
import EmailCapture from './EmailCapture'
import {authenticateDynamoDB} from "../utils/awsUtil";

class About extends React.Component {
    componentWillMount() {
        // authenticate the AWS-SDK s3 bucket using AWS Cognito user pool
        this.dynamodb = authenticateDynamoDB;
    }
  render() {
    const { history } = this.props;
    return (
          <div>
            <Col xs={10} xsOffset={1} className="text-container hidden-xs">
              <p>{ABOUT.P_1}</p>
              <p>{ABOUT.P_2}</p>
              <p>{ABOUT.P_3}</p>
              <p>{ABOUT.P_4}</p>
              <p>{ABOUT.P_5}</p>
                <EmailCapture dynamodb={this.dynamodb}/>
            </Col>
            <Col
              xs={10}
              xsOffset={1}
              className="text-container small hidden-sm hidden-md hidden-lg"
            >
              <p>{ABOUT.P_1}</p>
                <EmailCapture dynamodb={this.dynamodb} small/>
              <p>{ABOUT.P_2}</p>
              <p>{ABOUT.P_3}</p>
              <p>{ABOUT.P_4}</p>
              <p>{ABOUT.P_5}</p>
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
                href={ABOUT.LINK}
                target="_blank"
              >
                {ABOUT.WEBSITE}
              </Button>
            </Col>
            <Col
              xs={10}
              xsOffset={1}
              className="text-center hidden-md hidden-lg"
            >
              <Button
                bsStyle="link"
                bsSize="large"
                href={ABOUT.LINK}
                target="_blank"
              >
                {ABOUT.WEBSITE}
              </Button>
            </Col>
            <Col
              xs={10}
              xsOffset={1}
              className="text-center hidden-md hidden-lg"
            >
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

About.propTypes = {
    history: PropTypes.object.isRequired,
};

export default About;
