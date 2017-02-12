/*
 *
 * Hiragana
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectHiragana from './selectors';
import messages from './messages';

export class Hiragana extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Hiragana"
          meta={[
            { name: 'description', content: 'Description of Hiragana' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Hiragana.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hiragana: makeSelectHiragana(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hiragana);
