import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Row,
  Form,
  ControlLabel,
  Col,
  Button,
  Alert,
  Glyphicon,
} from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { BeatLoader } from 'react-spinners';
import { ABOUT } from '../utils/constants';
import renderInput from '../forms/renderInput';
import buildValidate from '../forms/validate';
import About from './About';
import {
  toggleEmailLoading,
  toggleEmailError,
  toggleEmailSuccess,
} from '../actions/actions';

class EmailCapture extends React.Component {
  formSubmit(email) {
    const {
      reset,
      dynamodb,
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

    dynamodb.putItem(params, function(err) {
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

  render() {
    const { small, handleSubmit, emailState } = this.props;

    if (emailState.success) {
      return (
        <Alert bsStyle="success" className="text-center">
          Welcome Aboard!
        </Alert>
      );
    }
    if (emailState.error) {
      return (
        <Alert bsStyle="danger" className="text-center">
          Arrrrrg! Something went wrong, try again later.
        </Alert>
      );
    }

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
            className={small ? '' : 'text-right'}
          >
            Join the crew!
          </Col>
          <Col xs={12} sm={4}>
            <Field
              name={'email'}
              placeholder="email@example.com"
              component={renderInput}
              type="email"
            />
          </Col>
          <Col xs={12} sm={4}>
            {!emailState.loading && (
              <Button type="submit" block={small}>
                Submit
              </Button>
            )}
            {emailState.loading && (
              <Button type="submit" block={small}>
                <BeatLoader loading={true} disabled={true} color={'#5DCEE0'} />
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}

EmailCapture.propTypes = {
  dynamodb: PropTypes.object.isRequired,
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
