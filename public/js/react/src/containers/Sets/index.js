/*
 *
 * Sets
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectSets from './selectors';
import messages from './messages';

export class Sets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Sets"
          meta={[
            { name: 'description', content: 'Description of Sets' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Sets.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sets: makeSelectSets(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sets);
