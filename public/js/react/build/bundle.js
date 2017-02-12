'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _reactRouterScroll = require('react-router-scroll');

require('sanitize.css/sanitize.css');

var _App = require('containers/App');

var _App2 = _interopRequireDefault(_App);

var _selectors = require('containers/App/selectors');

var _LanguageProvider = require('containers/LanguageProvider');

var _LanguageProvider2 = _interopRequireDefault(_LanguageProvider);

require('!file-loader?name=[name].[ext]!./favicon.ico');

require('!file-loader?name=[name].[ext]!./manifest.json');

require('file-loader?name=[name].[ext]!./.htaccess');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _i18n = require('./i18n');

require('./global-styles');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`


// Import CSS reset and Global Styles

/* eslint-enable import/no-unresolved, import/extensions */

// Import Language Provider


// Import root app
/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
var initialState = {};

// Import root routes


// Import i18n messages


// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */


// Import selector for `syncHistoryWithStore`


// Import all the third party stuff

var store = (0, _store2.default)(initialState, _reactRouter.browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store, {
  selectLocationState: (0, _selectors.makeSelectLocationState)()
});

// Set up the router, wrapping all Routes in the App component
var rootRoute = {
  component: _App2.default,
  childRoutes: (0, _routes2.default)(store)
};

var render = function render(messages) {
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _LanguageProvider2.default,
      { messages: messages },
      _react2.default.createElement(_reactRouter.Router, {
        history: history,
        routes: rootRoute,
        render:
        // Scroll to top when going to a new page, imitating default browser
        // behaviour
        (0, _reactRouter.applyRouterMiddleware)((0, _reactRouterScroll.useScroll)())
      })
    )
  ), document.getElementById('app'));
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', function () {
    render(_i18n.translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(function (resolve) {
    resolve(import('intl'));
  }).then(function () {
    return Promise.all([import('intl/locale-data/jsonp/en.js')]);
  }).then(function () {
    return render(_i18n.translationMessages);
  }).catch(function (err) {
    throw err;
  });
} else {
  render(_i18n.translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = 'en';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * App.react.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This component is the skeleton around the actual pages, and should only
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * contain code that should be seen on all pages. (e.g. navigation bar)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NOTE: while this component should technically be a stateless functional
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * component (SFC), hot reloading does not currently support SFCs. If hot
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * reloading is not a necessity for you then you can refactor it and remove
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * the linting exception.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var App = function (_React$PureComponent) {
  _inherits(App, _React$PureComponent);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.Children.toArray(this.props.children)
      );
    } // eslint-disable-line react/prefer-stateless-function

  }]);

  return App;
}(_react2.default.PureComponent);

App.propTypes = {
  children: _react2.default.PropTypes.node
};
exports.default = App;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// makeSelectLocationState expects a plain JS object for the routing state
var makeSelectLocationState = function makeSelectLocationState() {
  var prevRoutingState = void 0;
  var prevRoutingStateJS = void 0;

  return function (state) {
    var routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

exports.makeSelectLocationState = makeSelectLocationState;
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<App />', function () {
  it('should render its children', function () {
    var children = _react2.default.createElement(
      'h1',
      null,
      'Test'
    );
    var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(
      _index2.default,
      null,
      children
    ));
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
'use strict';

var _immutable = require('immutable');

var _selectors = require('containers/App/selectors');

describe('makeSelectLocationState', function () {
  it('should select the route as a plain JS object', function () {
    var route = (0, _immutable.fromJS)({
      locationBeforeTransitions: null
    });
    var mockedState = (0, _immutable.fromJS)({
      route: route
    });
    expect((0, _selectors.makeSelectLocationState)()(mockedState)).toEqual(route.toJS());
  });

  it('should return cached js routeState for same concurrent calls', function () {
    var route = (0, _immutable.fromJS)({
      locationBeforeTransitions: null
    });
    var mockedState = (0, _immutable.fromJS)({
      route: route
    });
    var selectLocationState = (0, _selectors.makeSelectLocationState)();

    var firstRouteStateJS = selectLocationState(mockedState);
    expect(selectLocationState(mockedState)).toBe(firstRouteStateJS);
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultAction = defaultAction;

var _constants = require('./constants');

function defaultAction() {
  return {
    type: _constants.DEFAULT_ACTION
  };
} /*
   *
   * Hiragana actions
   *
   */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 *
 * Hiragana constants
 *
 */

var DEFAULT_ACTION = exports.DEFAULT_ACTION = 'app/Hiragana/DEFAULT_ACTION';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hiragana = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Hiragana
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Hiragana = exports.Hiragana = function (_React$PureComponent) {
  _inherits(Hiragana, _React$PureComponent);

  function Hiragana() {
    _classCallCheck(this, Hiragana);

    return _possibleConstructorReturn(this, (Hiragana.__proto__ || Object.getPrototypeOf(Hiragana)).apply(this, arguments));
  }

  _createClass(Hiragana, [{
    key: 'render',
    // eslint-disable-line react/prefer-stateless-function
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactHelmet2.default, {
          title: 'Hiragana',
          meta: [{ name: 'description', content: 'Description of Hiragana' }]
        }),
        _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.header)
      );
    }
  }]);

  return Hiragana;
}(_react2.default.PureComponent);

Hiragana.propTypes = {
  dispatch: _react.PropTypes.func.isRequired
};

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  hiragana: (0, _selectors2.default)()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Hiragana);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactIntl = require('react-intl');

exports.default = (0, _reactIntl.defineMessages)({
  header: {
    id: 'app.containers.Hiragana.header',
    defaultMessage: 'This is Hiragana container !'
  }
}); /*
     * Hiragana Messages
     *
     * This contains all the text for the Hiragana component.
     */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

/*
 *
 * Hiragana reducer
 *
 */

var initialState = (0, _immutable.fromJS)({});

function hiraganaReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

exports.default = hiraganaReducer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;

var _marked = [defaultSaga].map(regeneratorRuntime.mark);

// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

// All sagas to be loaded
exports.default = [defaultSaga];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectHiraganaDomain = undefined;

var _reselect = require('reselect');

/**
 * Direct selector to the hiragana state domain
 */
var selectHiraganaDomain = function selectHiraganaDomain() {
  return function (state) {
    return state.get('hiragana');
  };
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Hiragana
 */

var makeSelectHiragana = function makeSelectHiragana() {
  return (0, _reselect.createSelector)(selectHiraganaDomain(), function (substate) {
    return substate.toJS();
  });
};

exports.default = makeSelectHiragana;
exports.selectHiraganaDomain = selectHiraganaDomain;
'use strict';

var _actions = require('../actions');

var _constants = require('../constants');

describe('Hiragana actions', function () {
  describe('Default Action', function () {
    it('has a type of DEFAULT_ACTION', function () {
      var expected = {
        type: _constants.DEFAULT_ACTION
      };
      expect((0, _actions.defaultAction)()).toEqual(expected);
    });
  });
});
'use strict';

// import React from 'react';
// import { shallow } from 'enzyme';

// import { Hiragana } from '../index';

describe('<Hiragana />', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

var _immutable = require('immutable');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('hiraganaReducer', function () {
  it('returns the initial state', function () {
    expect((0, _reducer2.default)(undefined, {})).toEqual((0, _immutable.fromJS)({}));
  });
});
'use strict';

/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { defaultSaga } from '../sagas';

// const generator = defaultSaga();

describe('defaultSaga Saga', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

// import { fromJS } from 'immutable';
// import { makeSelectHiraganaDomain } from '../selectors';

// const selector = makeSelectHiraganaDomain();

describe('makeSelectHiraganaDomain', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * HomePage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is the first thing users see of our App, at the '/' route
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NOTE: while this component should technically be a stateless functional
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * component (SFC), hot reloading does not currently support SFCs. If hot
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * reloading is not a necessity for you then you can refactor it and remove
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * the linting exception.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var HomePage = function (_React$PureComponent) {
  _inherits(HomePage, _React$PureComponent);

  function HomePage() {
    _classCallCheck(this, HomePage);

    return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).apply(this, arguments));
  }

  _createClass(HomePage, [{
    key: 'render',
    // eslint-disable-line react/prefer-stateless-function
    value: function render() {
      return _react2.default.createElement(
        'h1',
        null,
        _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.header)
      );
    }
  }]);

  return HomePage;
}(_react2.default.PureComponent);

exports.default = HomePage;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactIntl = require('react-intl');

exports.default = (0, _reactIntl.defineMessages)({
  header: {
    id: 'app.components.HomePage.header',
    defaultMessage: 'This is HomePage component!'
  }
}); /*
     * HomePage Messages
     *
     * This contains all the text for the HomePage component.
     */
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<HomePage />', function () {
  it('should render the page message', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, null));
    expect(renderedComponent.contains(_react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.header))).toEqual(true);
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultAction = defaultAction;

var _constants = require('./constants');

function defaultAction() {
  return {
    type: _constants.DEFAULT_ACTION
  };
} /*
   *
   * Katakana actions
   *
   */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 *
 * Katakana constants
 *
 */

var DEFAULT_ACTION = exports.DEFAULT_ACTION = 'app/Katakana/DEFAULT_ACTION';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Katakana = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Katakana
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Katakana = exports.Katakana = function (_React$PureComponent) {
  _inherits(Katakana, _React$PureComponent);

  function Katakana() {
    _classCallCheck(this, Katakana);

    return _possibleConstructorReturn(this, (Katakana.__proto__ || Object.getPrototypeOf(Katakana)).apply(this, arguments));
  }

  _createClass(Katakana, [{
    key: 'render',
    // eslint-disable-line react/prefer-stateless-function
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactHelmet2.default, {
          title: 'Katakana',
          meta: [{ name: 'description', content: 'Description of Katakana' }]
        }),
        _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.header)
      );
    }
  }]);

  return Katakana;
}(_react2.default.PureComponent);

Katakana.propTypes = {
  dispatch: _react.PropTypes.func.isRequired
};

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  katakana: (0, _selectors2.default)()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Katakana);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactIntl = require('react-intl');

exports.default = (0, _reactIntl.defineMessages)({
  header: {
    id: 'app.containers.Katakana.header',
    defaultMessage: 'This is Katakana container !'
  }
}); /*
     * Katakana Messages
     *
     * This contains all the text for the Katakana component.
     */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

/*
 *
 * Katakana reducer
 *
 */

var initialState = (0, _immutable.fromJS)({});

function katakanaReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

exports.default = katakanaReducer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;

var _marked = [defaultSaga].map(regeneratorRuntime.mark);

// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

// All sagas to be loaded
exports.default = [defaultSaga];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectKatakanaDomain = undefined;

var _reselect = require('reselect');

/**
 * Direct selector to the katakana state domain
 */
var selectKatakanaDomain = function selectKatakanaDomain() {
  return function (state) {
    return state.get('katakana');
  };
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Katakana
 */

var makeSelectKatakana = function makeSelectKatakana() {
  return (0, _reselect.createSelector)(selectKatakanaDomain(), function (substate) {
    return substate.toJS();
  });
};

exports.default = makeSelectKatakana;
exports.selectKatakanaDomain = selectKatakanaDomain;
'use strict';

var _actions = require('../actions');

var _constants = require('../constants');

describe('Katakana actions', function () {
  describe('Default Action', function () {
    it('has a type of DEFAULT_ACTION', function () {
      var expected = {
        type: _constants.DEFAULT_ACTION
      };
      expect((0, _actions.defaultAction)()).toEqual(expected);
    });
  });
});
'use strict';

// import React from 'react';
// import { shallow } from 'enzyme';

// import { Katakana } from '../index';

describe('<Katakana />', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

var _immutable = require('immutable');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('katakanaReducer', function () {
  it('returns the initial state', function () {
    expect((0, _reducer2.default)(undefined, {})).toEqual((0, _immutable.fromJS)({}));
  });
});
'use strict';

/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { defaultSaga } from '../sagas';

// const generator = defaultSaga();

describe('defaultSaga Saga', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

// import { fromJS } from 'immutable';
// import { makeSelectKatakanaDomain } from '../selectors';

// const selector = makeSelectKatakanaDomain();

describe('makeSelectKatakanaDomain', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeLocale = changeLocale;

var _constants = require('./constants');

function changeLocale(languageLocale) {
  return {
    type: _constants.CHANGE_LOCALE,
    locale: languageLocale
  };
} /*
   *
   * LanguageProvider actions
   *
   */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 *
 * LanguageProvider constants
 *
 */

var CHANGE_LOCALE = exports.CHANGE_LOCALE = 'app/LanguageToggle/CHANGE_LOCALE';
var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = 'en';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reselect = require('reselect');

var _reactIntl = require('react-intl');

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LanguageProvider
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this component connects the redux state language locale to the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * IntlProvider component and i18n messages (loaded from `app/translations`)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LanguageProvider = exports.LanguageProvider = function (_React$PureComponent) {
  _inherits(LanguageProvider, _React$PureComponent);

  function LanguageProvider() {
    _classCallCheck(this, LanguageProvider);

    return _possibleConstructorReturn(this, (LanguageProvider.__proto__ || Object.getPrototypeOf(LanguageProvider)).apply(this, arguments));
  }

  _createClass(LanguageProvider, [{
    key: 'render',
    // eslint-disable-line react/prefer-stateless-function
    value: function render() {
      return _react2.default.createElement(
        _reactIntl.IntlProvider,
        { locale: this.props.locale, key: this.props.locale, messages: this.props.messages[this.props.locale] },
        _react2.default.Children.only(this.props.children)
      );
    }
  }]);

  return LanguageProvider;
}(_react2.default.PureComponent);

LanguageProvider.propTypes = {
  locale: _react2.default.PropTypes.string,
  messages: _react2.default.PropTypes.object,
  children: _react2.default.PropTypes.element.isRequired
};

var mapStateToProps = (0, _reselect.createSelector)((0, _selectors.makeSelectLocale)(), function (locale) {
  return { locale: locale };
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LanguageProvider);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

var _constants2 = require('../App/constants');

// eslint-disable-line

var initialState = (0, _immutable.fromJS)({
  locale: _constants2.DEFAULT_LOCALE
}); /*
     *
     * LanguageProvider reducer
     *
     */

function languageProviderReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.CHANGE_LOCALE:
      return state.set('locale', action.locale);
    default:
      return state;
  }
}

exports.default = languageProviderReducer;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSelectLocale = exports.selectLanguage = undefined;

var _reselect = require('reselect');

/**
 * Direct selector to the languageToggle state domain
 */
var selectLanguage = function selectLanguage(state) {
  return state.get('language');
};

/**
 * Select the language locale
 */

var makeSelectLocale = function makeSelectLocale() {
  return (0, _reselect.createSelector)(selectLanguage, function (languageState) {
    return languageState.get('locale');
  });
};

exports.selectLanguage = selectLanguage;
exports.makeSelectLocale = makeSelectLocale;
'use strict';

var _actions = require('../actions');

var _constants = require('../constants');

describe('LanguageProvider actions', function () {
  describe('Change Local Action', function () {
    it('has a type of CHANGE_LOCALE', function () {
      var expected = {
        type: _constants.CHANGE_LOCALE,
        locale: 'de'
      };
      expect((0, _actions.changeLocale)('de')).toEqual(expected);
    });
  });
});
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reactIntl = require('react-intl');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _store = require('../../../store');

var _store2 = _interopRequireDefault(_store);

var _i18n = require('../../../i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messages = (0, _reactIntl.defineMessages)({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message'
  }
});

describe('<LanguageProvider />', function () {
  it('should render its children', function () {
    var children = _react2.default.createElement(
      'h1',
      null,
      'Test'
    );
    var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(
      _index.LanguageProvider,
      { messages: messages, locale: 'en' },
      children
    ));
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

describe('<ConnectedLanguageProvider />', function () {
  var store = void 0;

  beforeAll(function () {
    store = (0, _store2.default)({}, _reactRouter.browserHistory);
  });

  it('should render the default language messages', function () {
    var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _index2.default,
        { messages: _i18n.translationMessages },
        _react2.default.createElement(_reactIntl.FormattedMessage, messages.someMessage)
      )
    ));
    expect(renderedComponent.contains(_react2.default.createElement(_reactIntl.FormattedMessage, messages.someMessage))).toBe(true);
  });
});
'use strict';

var _immutable = require('immutable');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('languageProviderReducer', function () {
  it('returns the initial state', function () {
    expect((0, _reducer2.default)(undefined, {})).toEqual((0, _immutable.fromJS)({
      locale: 'en'
    }));
  });

  it('changes the locale', function () {
    expect((0, _reducer2.default)(undefined, { type: _constants.CHANGE_LOCALE, locale: 'de' }).toJS()).toEqual({
      locale: 'de'
    });
  });
});
'use strict';

var _immutable = require('immutable');

var _selectors = require('../selectors');

describe('selectLanguage', function () {
  it('should select the global state', function () {
    var globalState = (0, _immutable.fromJS)({});
    var mockedState = (0, _immutable.fromJS)({
      language: globalState
    });
    expect((0, _selectors.selectLanguage)(mockedState)).toEqual(globalState);
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NotFoundPage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is the page we show when the user visits a url that doesn't have a route
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NOTE: while this component should technically be a stateless functional
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * component (SFC), hot reloading does not currently support SFCs. If hot
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * reloading is not a necessity for you then you can refactor it and remove
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * the linting exception.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var NotFound = function (_React$PureComponent) {
  _inherits(NotFound, _React$PureComponent);

  function NotFound() {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
  }

  _createClass(NotFound, [{
    key: 'render',
    // eslint-disable-line react/prefer-stateless-function
    value: function render() {
      return _react2.default.createElement(
        'h1',
        null,
        _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.header)
      );
    }
  }]);

  return NotFound;
}(_react2.default.PureComponent);

exports.default = NotFound;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactIntl = require('react-intl');

exports.default = (0, _reactIntl.defineMessages)({
  header: {
    id: 'app.components.NotFoundPage.header',
    defaultMessage: 'This is NotFoundPage component!'
  }
}); /*
     * NotFoundPage Messages
     *
     * This contains all the text for the NotFoundPage component.
     */
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<NotFoundPage />', function () {
  it('should render the page message', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, null));
    expect(renderedComponent.contains(_react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.header))).toEqual(true);
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultAction = defaultAction;

var _constants = require('./constants');

function defaultAction() {
  return {
    type: _constants.DEFAULT_ACTION
  };
} /*
   *
   * Sets actions
   *
   */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 *
 * Sets constants
 *
 */

var DEFAULT_ACTION = exports.DEFAULT_ACTION = 'app/Sets/DEFAULT_ACTION';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sets = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Sets
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Sets = exports.Sets = function (_React$PureComponent) {
  _inherits(Sets, _React$PureComponent);

  function Sets() {
    _classCallCheck(this, Sets);

    return _possibleConstructorReturn(this, (Sets.__proto__ || Object.getPrototypeOf(Sets)).apply(this, arguments));
  }

  _createClass(Sets, [{
    key: 'render',
    // eslint-disable-line react/prefer-stateless-function
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactHelmet2.default, {
          title: 'Sets',
          meta: [{ name: 'description', content: 'Description of Sets' }]
        }),
        _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.header)
      );
    }
  }]);

  return Sets;
}(_react2.default.PureComponent);

Sets.propTypes = {
  dispatch: _react.PropTypes.func.isRequired
};

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  sets: (0, _selectors2.default)()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Sets);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactIntl = require('react-intl');

exports.default = (0, _reactIntl.defineMessages)({
  header: {
    id: 'app.containers.Sets.header',
    defaultMessage: 'This is Sets container !'
  }
}); /*
     * Sets Messages
     *
     * This contains all the text for the Sets component.
     */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

/*
 *
 * Sets reducer
 *
 */

var initialState = (0, _immutable.fromJS)({});

function setsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

exports.default = setsReducer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSaga = defaultSaga;

var _marked = [defaultSaga].map(regeneratorRuntime.mark);

// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

// All sagas to be loaded
exports.default = [defaultSaga];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSetsDomain = undefined;

var _reselect = require('reselect');

/**
 * Direct selector to the sets state domain
 */
var selectSetsDomain = function selectSetsDomain() {
  return function (state) {
    return state.get('sets');
  };
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Sets
 */

var makeSelectSets = function makeSelectSets() {
  return (0, _reselect.createSelector)(selectSetsDomain(), function (substate) {
    return substate.toJS();
  });
};

exports.default = makeSelectSets;
exports.selectSetsDomain = selectSetsDomain;
'use strict';

var _actions = require('../actions');

var _constants = require('../constants');

describe('Sets actions', function () {
  describe('Default Action', function () {
    it('has a type of DEFAULT_ACTION', function () {
      var expected = {
        type: _constants.DEFAULT_ACTION
      };
      expect((0, _actions.defaultAction)()).toEqual(expected);
    });
  });
});
'use strict';

// import React from 'react';
// import { shallow } from 'enzyme';

// import { Sets } from '../index';

describe('<Sets />', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

var _immutable = require('immutable');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('setsReducer', function () {
  it('returns the initial state', function () {
    expect((0, _reducer2.default)(undefined, {})).toEqual((0, _immutable.fromJS)({}));
  });
});
'use strict';

/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { defaultSaga } from '../sagas';

// const generator = defaultSaga();

describe('defaultSaga Saga', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

// import { fromJS } from 'immutable';
// import { makeSelectSetsDomain } from '../selectors';

// const selector = makeSelectSetsDomain();

describe('makeSelectSetsDomain', function () {
  it('Expect to have unit tests specified', function () {
    expect(true).toEqual(false);
  });
});
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  html,\n  body {\n    height: 100%;\n    width: 100%;\n  }\n\n  body {\n    font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n  }\n\n  body.fontLoaded {\n    font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n  }\n\n  #app {\n    background-color: #fafafa;\n    min-height: 100%;\n    min-width: 100%;\n  }\n\n  p,\n  label {\n    font-family: Georgia, Times, \'Times New Roman\', serif;\n    line-height: 1.5em;\n  }\n'], ['\n  html,\n  body {\n    height: 100%;\n    width: 100%;\n  }\n\n  body {\n    font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n  }\n\n  body.fontLoaded {\n    font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n  }\n\n  #app {\n    background-color: #fafafa;\n    min-height: 100%;\n    min-width: 100%;\n  }\n\n  p,\n  label {\n    font-family: Georgia, Times, \'Times New Roman\', serif;\n    line-height: 1.5em;\n  }\n']);

var _styledComponents = require('styled-components');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* eslint no-unused-expressions: 0 */
(0, _styledComponents.injectGlobal)(_templateObject);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translationMessages = exports.formatTranslationMessages = exports.appLocales = undefined;

var _reactIntl = require('react-intl');

var _en = require('react-intl/locale-data/en');

var _en2 = _interopRequireDefault(_en);

var _ja = require('react-intl/locale-data/ja');

var _ja2 = _interopRequireDefault(_ja);

var _constants = require('./containers/App/constants');

var _en3 = require('./translations/en.json');

var _en4 = _interopRequireDefault(_en3);

var _ja3 = require('./translations/ja.json');

var _ja4 = _interopRequireDefault(_ja3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * i18n.js
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * This will setup the i18n language files and locale data for your app.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   */
// eslint-disable-line


var appLocales = exports.appLocales = ['en', 'ja'];

(0, _reactIntl.addLocaleData)(_en2.default);
(0, _reactIntl.addLocaleData)(_ja2.default);

var formatTranslationMessages = exports.formatTranslationMessages = function formatTranslationMessages(locale, messages) {
  var defaultFormattedMessages = locale !== _constants.DEFAULT_LOCALE ? formatTranslationMessages(_constants.DEFAULT_LOCALE, _en4.default) : {};
  return Object.keys(messages).reduce(function (formattedMessages, key) {
    var message = messages[key];
    if (!message && locale !== _constants.DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return Object.assign(formattedMessages, _defineProperty({}, key, message));
  }, {});
};

var translationMessages = exports.translationMessages = {
  en: formatTranslationMessages('en', _en4.default),
  ja: formatTranslationMessages('ja', _ja4.default)
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Combine all reducers in this file and export the combined reducers.
                                                                                                                                                                                                                                                                   * If we were to do this in store.js, reducers wouldn't be hot reloadable.
                                                                                                                                                                                                                                                                   */

exports.default = createReducer;

var _reduxImmutable = require('redux-immutable');

var _immutable = require('immutable');

var _reactRouterRedux = require('react-router-redux');

var _reducer = require('containers/LanguageProvider/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
var routeInitialState = (0, _immutable.fromJS)({
  locationBeforeTransitions: null
});

/**
 * Merge route into the global application state
 */
function routeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : routeInitialState;
  var action = arguments[1];

  switch (action.type) {
    /* istanbul ignore next */
    case _reactRouterRedux.LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
function createReducer(asyncReducers) {
  return (0, _reduxImmutable.combineReducers)(_extends({
    route: routeReducer,
    language: _reducer2.default
  }, asyncReducers));
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business


exports.default = createRoutes;

var _asyncInjectors = require('utils/asyncInjectors');

var errorLoading = function errorLoading(err) {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

var loadModule = function loadModule(cb) {
  return function (componentModule) {
    cb(null, componentModule.default);
  };
};

function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  var _getAsyncInjectors = (0, _asyncInjectors.getAsyncInjectors)(store),
      injectReducer = _getAsyncInjectors.injectReducer,
      injectSagas = _getAsyncInjectors.injectSagas; // eslint-disable-line no-unused-vars

  return [{
    path: '/',
    name: 'home',
    getComponent: function getComponent(nextState, cb) {
      var importModules = Promise.all([import('containers/HomePage')]);

      var renderRoute = loadModule(cb);

      importModules.then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            component = _ref2[0];

        renderRoute(component);
      });

      importModules.catch(errorLoading);
    }
  }, {
    path: '/sets',
    name: 'sets',
    getComponent: function getComponent(nextState, cb) {
      var importModules = Promise.all([import('containers/Sets/reducer'), import('containers/Sets/sagas'), import('containers/Sets')]);

      var renderRoute = loadModule(cb);

      importModules.then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 3),
            reducer = _ref4[0],
            sagas = _ref4[1],
            component = _ref4[2];

        injectReducer('sets', reducer.default);
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    }
  }, {
    path: '/hiragana',
    name: 'hiragana',
    getComponent: function getComponent(nextState, cb) {
      var importModules = Promise.all([import('containers/Hiragana/reducer'), import('containers/Hiragana/sagas'), import('containers/Hiragana')]);

      var renderRoute = loadModule(cb);

      importModules.then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 3),
            reducer = _ref6[0],
            sagas = _ref6[1],
            component = _ref6[2];

        injectReducer('hiragana', reducer.default);
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    }
  }, {
    path: '/katakana',
    name: 'katakana',
    getComponent: function getComponent(nextState, cb) {
      var importModules = Promise.all([import('containers/Katakana/reducer'), import('containers/Katakana/sagas'), import('containers/Katakana')]);

      var renderRoute = loadModule(cb);

      importModules.then(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 3),
            reducer = _ref8[0],
            sagas = _ref8[1],
            component = _ref8[2];

        injectReducer('katakana', reducer.default);
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    }
  }, {
    path: '*',
    name: 'notfound',
    getComponent: function getComponent(nextState, cb) {
      import('containers/NotFoundPage').then(loadModule(cb)).catch(errorLoading);
    }
  }];
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Create the store with asynchronously loaded reducers
                                                                                                                                                                                                                                                                               */

exports.default = configureStore;

var _redux = require('redux');

var _immutable = require('immutable');

var _reactRouterRedux = require('react-router-redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sagaMiddleware = (0, _reduxSaga2.default)();

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var history = arguments[1];

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  var middlewares = [sagaMiddleware, (0, _reactRouterRedux.routerMiddleware)(history)];

  var enhancers = [_redux.applyMiddleware.apply(undefined, middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  var composeEnhancers = process.env.NODE_ENV !== 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : _redux.compose;
  /* eslint-enable */

  var store = (0, _redux.createStore)((0, _reducers2.default)(), (0, _immutable.fromJS)(initialState), composeEnhancers.apply(undefined, enhancers));

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', function () {
      import('./reducers').then(function (reducerModule) {
        var createReducers = reducerModule.default;
        var nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
'use strict';

var _constants = require('../containers/App/constants');

var _i18n = require('../i18n');

jest.mock('../translations/en.json', function () {
  return {
    message1: 'default message',
    message2: 'default message 2'
  };
});

var esTranslationMessages = {
  message1: 'mensaje predeterminado',
  message2: ''
};

describe('formatTranslationMessages', function () {
  it('should build only defaults when DEFAULT_LOCALE', function () {
    var result = (0, _i18n.formatTranslationMessages)(_constants.DEFAULT_LOCALE, { a: 'a' });

    expect(result).toEqual({ a: 'a' });
  });

  it('should combine default locale and current locale when not DEFAULT_LOCALE', function () {
    var result = (0, _i18n.formatTranslationMessages)('', esTranslationMessages);

    expect(result).toEqual({
      message1: 'mensaje predeterminado',
      message2: 'default message 2'
    });
  });
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Test store addons
                                                                                                                                                                                                                                                                               */

var _reactRouter = require('react-router');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('configureStore', function () {
  var store = void 0;

  beforeAll(function () {
    store = (0, _store2.default)({}, _reactRouter.browserHistory);
  });

  describe('asyncReducers', function () {
    it('should contain an object for async reducers', function () {
      expect(_typeof(store.asyncReducers)).toBe('object');
    });
  });

  describe('runSaga', function () {
    it('should contain a hook for `sagaMiddleware.run`', function () {
      expect(_typeof(store.runSaga)).toBe('function');
    });
  });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkStore = checkStore;
exports.injectAsyncReducer = injectAsyncReducer;
exports.injectAsyncSagas = injectAsyncSagas;
exports.getAsyncInjectors = getAsyncInjectors;

var _conformsTo = require('lodash/conformsTo');

var _conformsTo2 = _interopRequireDefault(_conformsTo);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reducers = require('reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate the shape of redux store
 */
function checkStore(store) {
  var shape = {
    dispatch: _isFunction2.default,
    subscribe: _isFunction2.default,
    getState: _isFunction2.default,
    replaceReducer: _isFunction2.default,
    runSaga: _isFunction2.default,
    asyncReducers: _isObject2.default
  };
  (0, _invariant2.default)((0, _conformsTo2.default)(store, shape), '(app/utils...) asyncInjectors: Expected a valid redux store');
}

/**
 * Inject an asynchronously loaded reducer
 */
function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    (0, _invariant2.default)((0, _isString2.default)(name) && !(0, _isEmpty2.default)(name) && (0, _isFunction2.default)(asyncReducer), '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function');

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer((0, _reducers2.default)(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store);

    (0, _invariant2.default)(Array.isArray(sagas), '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions');

    (0, _warning2.default)(!(0, _isEmpty2.default)(sagas), '(app/utils...) injectAsyncSagas: Received an empty `sagas` array');

    sagas.map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true)
  };
}
'use strict';

var _reactRouter = require('react-router');

var _effects = require('redux-saga/effects');

var _immutable = require('immutable');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _asyncInjectors = require('../asyncInjectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [testSaga].map(regeneratorRuntime.mark); /**
                                                        * Test async injectors
                                                        */

// Fixtures

var initialState = (0, _immutable.fromJS)({ reduced: 'soon' });

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'TEST':
      return state.set('reduced', action.payload);
    default:
      return state;
  }
};

function testSaga() {
  return regeneratorRuntime.wrap(function testSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.put)({ type: 'TEST', payload: 'yup' });

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var sagas = [testSaga];

describe('asyncInjectors', function () {
  var store = void 0;

  describe('getAsyncInjectors', function () {
    beforeAll(function () {
      store = (0, _store2.default)({}, _reactRouter.memoryHistory);
    });

    it('given a store, should return all async injectors', function () {
      var _getAsyncInjectors = (0, _asyncInjectors.getAsyncInjectors)(store),
          injectReducer = _getAsyncInjectors.injectReducer,
          injectSagas = _getAsyncInjectors.injectSagas;

      injectReducer('test', reducer);
      injectSagas(sagas);

      var actual = store.getState().get('test');
      var expected = initialState.merge({ reduced: 'yup' });

      expect(actual.toJS()).toEqual(expected.toJS());
    });

    it('should throw if passed invalid store shape', function () {
      var result = false;

      Reflect.deleteProperty(store, 'dispatch');

      try {
        (0, _asyncInjectors.getAsyncInjectors)(store);
      } catch (err) {
        result = err.name === 'Invariant Violation';
      }

      expect(result).toEqual(true);
    });
  });

  describe('helpers', function () {
    beforeAll(function () {
      store = (0, _store2.default)({}, _reactRouter.memoryHistory);
    });

    describe('injectAsyncReducer', function () {
      it('given a store, it should provide a function to inject a reducer', function () {
        var injectReducer = (0, _asyncInjectors.injectAsyncReducer)(store);

        injectReducer('test', reducer);

        var actual = store.getState().get('test');
        var expected = initialState;

        expect(actual.toJS()).toEqual(expected.toJS());
      });

      it('should not assign reducer if already existing', function () {
        var injectReducer = (0, _asyncInjectors.injectAsyncReducer)(store);

        injectReducer('test', reducer);
        injectReducer('test', function () {});

        expect(store.asyncReducers.test.toString()).toEqual(reducer.toString());
      });

      it('should throw if passed invalid name', function () {
        var result = false;

        var injectReducer = (0, _asyncInjectors.injectAsyncReducer)(store);

        try {
          injectReducer('', reducer);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectReducer(999, reducer);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toEqual(true);
      });

      it('should throw if passed invalid reducer', function () {
        var result = false;

        var injectReducer = (0, _asyncInjectors.injectAsyncReducer)(store);

        try {
          injectReducer('bad', 'nope');
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectReducer('coolio', 12345);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toEqual(true);
      });
    });

    describe('injectAsyncSagas', function () {
      it('given a store, it should provide a function to inject a saga', function () {
        var injectSagas = (0, _asyncInjectors.injectAsyncSagas)(store);

        injectSagas(sagas);

        var actual = store.getState().get('test');
        var expected = initialState.merge({ reduced: 'yup' });

        expect(actual.toJS()).toEqual(expected.toJS());
      });

      it('should throw if passed invalid saga', function () {
        var result = false;

        var injectSagas = (0, _asyncInjectors.injectAsyncSagas)(store);

        try {
          injectSagas({ testSaga: testSaga });
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectSagas(testSaga);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toEqual(true);
      });
    });
  });
});

//# sourceMappingURL=bundle.js.map