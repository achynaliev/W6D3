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
