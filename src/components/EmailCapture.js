import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Form, ControlLabel, Col, Button, Alert } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { BeatLoader } from 'react-spinners';
import { authenticateDynamoDB } from '../utils/awsUtil';
import renderInput from '../forms/renderInput';
import buildValidate from '../forms/validate';
import {
  toggleEmailLoading,
  toggleEmailError,
  toggleEmailSuccess,
} from '../actions/actions';

class EmailCapture extends React.Component {
    componentWillMount() {
        // authenticate the AWS-SDK s3 bucket using AWS Cognito user pool
        this.dynamodb = authenticateDynamoDB;
    }

  formSubmit(email) {
    const {
      reset,
      toggleEmailLoading,
      toggleEmailError,
      toggleEmailSuccess,
    } = this.props;

    toggleEmailLoading(true);

    const params = {
      Item: {
        apples: {
          S: 'email',
        },
        email: {
          S: email.email,
        },
      },
      TableName: 'mailing_list',
    };

    this.dynamodb.putItem(params, function(err) {
      if (err) {
        toggleEmailError(true);
        toggleEmailLoading(false);
      } else {
        toggleEmailSuccess(true);
        toggleEmailLoading(false);
      }
    });

    reset('email');
  }

  renderEmailForm() {
    const { small, handleSubmit, emailState } = this.props;

    return (
      <Form
        horizontal
        onSubmit={handleSubmit(email => {
          this.formSubmit(email);
        })}
      >
        <Row className={small ? 'margin-bottom-20' : 'margin-top-40'}>
          <Col
            xs={12}
            sm={4}
            componentClass={ControlLabel}
            className={small ? 'padding-top-0' : 'text-right padding-top-0'}
          >
            Join the crew!
          </Col>
          <Col xs={12} sm={4} className='margin-bottom-10'>
            <Field
              name={'email'}
              placeholder="email@example.com"
              component={renderInput}
              type="email"
            />
          </Col>
          <Col xs={12} sm={4}>
            {!emailState.loading && (
              <Button type="submit" className={small ? 'submit-button-color' : 'pull-left submit-button-color'} block={small}>
                Embark!
              </Button>
            )}
            {emailState.loading && (
              <Button type="submit" className={small ? '' : 'pull-left'} block={small}>
                <BeatLoader loading={true} disabled={true} color={'#5DCEE0'} />
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { emailState } = this.props;

    if (emailState.success) {
      return (
        <Alert bsStyle="success" className="text-center">
          Welcome Aboard!
        </Alert>
      );
    }
    if (emailState.error) {
      return (
        <div>
          <Alert bsStyle="danger" className="text-center">
            Arrrrrg! Something went wrong, try again later.
          </Alert>
          {this.renderEmailForm()}
        </div>
      );
    }

    return <div>{this.renderEmailForm()}</div>;
  }
}

EmailCapture.propTypes = {
  emailState: PropTypes.object.isRequired,
  toggleEmailLoading: PropTypes.func.isRequired,
  toggleEmailError: PropTypes.func.isRequired,
  toggleEmailSuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  small: PropTypes.bool,
};

const required = ['email'];
const validate = buildValidate(required);

EmailCapture = reduxForm({
  form: 'emailCapture',
  validate,
})(EmailCapture);

export default withRouter(
  connect(
    state => ({
      emailState: state.emailState,
    }),
    {
      toggleEmailLoading,
      toggleEmailError,
      toggleEmailSuccess,
    },
  )(EmailCapture),
);
