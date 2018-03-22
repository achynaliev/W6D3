/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
// const InfiniteTweets = require('./infinite_tweets');
// const TweetCompose = require('./tweet_compose');
const UsersSearch = __webpack_require__(3);

$(function () {
  // $('div.infinite-tweets').each( (i, tweet) => new InfiniteTweets(tweet) );
  // $('form.tweet-compose').each( (i, form) => new TweetCompose(form) );
  $('.users-search').each( (i, search) => new UsersSearch(search) );
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn, {}) );
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    // this.$currentUser = this.$el.find("data-current-user");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.$button = this.$el.find("button");
    this.$el.on('click', this.handleClick.bind(this));
  }

  handleClick (e) {
    e.preventDefault();
    if (this.followState === true) {
      APIUtil.unfollowUser(this.userId).then(() => {
        this.followState = false;
        this.render();
      });
    } else {
      APIUtil.followUser(this.userId).then(() => {
        this.followState = true;
        this.render();
      });
    }
  }


  render () {
    if (this.followState === true) {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  }
}

module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    let call = $.ajax({
      url: `/users/${id}/follow`,
      method: "POST",
      dataType: 'json',
    });
    return call;
  },

  unfollowUser: id => {

    let call = $.ajax({
      url: `/users/${id}/follow`,
      method: "DELETE",
      dataType: 'json',
    });
    return call;
  },

  searchUsers: (queryVal, success) => {
    let search = $.ajax({
      url: '/users/search',
      method: 'GET',
      dataType: 'json',
      data: {query: queryVal},
    });
    return search;
  }

};


module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

class UsersSearch {

  constructor(el, options) {
    this.$el = $(el);
    this.$input = this.$el.find('input');
    this.$usersUl = this.$el.find('ul');
    this.$el.on('input', (e) => this.handleInput());
  }

   async handleInput() {
    let input = this.$input.val();
    const users = await APIUtil.searchUsers(input);
    users.forEach((user) => {
      const $li = $(`<li>${user.username}</li>`);

      this.$usersUl.append($li);
    });
  }

}

module.exports = UsersSearch;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map