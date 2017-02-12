/*
 *
 * Katakana
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectKatakana from './selectors';
import messages from './messages';

export class Katakana extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Katakana"
          meta={[
            { name: 'description', content: 'Description of Katakana' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Katakana.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  katakana: makeSelectKatakana(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Katakana);
