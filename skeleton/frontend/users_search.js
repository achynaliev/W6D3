const APIUtil = require('./api_util');

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
