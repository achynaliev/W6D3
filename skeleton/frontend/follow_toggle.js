const APIUtil = require('./api_util');

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
