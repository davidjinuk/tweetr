$(function () {

  function approximateTime(unixTime) {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = Date.now() - unixTime;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';
    }
  }

  $(".slide-toggle").click(function() {
    $(".new-tweet").slideToggle();
    $(".text-input").focus();
  });

  function createTweetElement(tweet) {
    // elements
    let $tweet = $("<article>").addClass("tweet");
    let header = $("<header>");
    let image = $("<img>");
    let name = $("<h2>");
    let handle = $("<h6>");
    let content = $("<p>");
    let footer = $("<footer>");
    let time = $("<time>");
    // new icons
    let icons = $("<div>").addClass("icons");

    //icons flag share like
    const flag = $("<i>").addClass("fa fa-flag");
    const share = $("<i>").addClass("fa fa-share-alt");
    const like = $("<i>").addClass("fa fa-heart");

    //user data
    const userName = tweet.user.name;
    const userAvatar = tweet.user.avatars.small;
    const userHandle = tweet.user.handle;
    const userContent = tweet.content.text;
    const userCreated = approximateTime(tweet.created_at);

    //header
    $($tweet).append(header);
    $(header).append(image);
    $(image).attr("src", userAvatar);
    $(name).text(userName);
    $(header).append(name);
    $(handle).text(userHandle);
    $(header).append(handle);

    //content
    $($tweet).append(content);
    $(content).text(userContent);

    //footer
    $($tweet).append(footer);
    $(time).text(userCreated);
    $(footer).append(time);
    $(icons).append(flag);
    $(icons).append(share);
    $(icons).append(like);
    $(footer).append(icons);

    return $tweet;
  }

  //send each user data to createTweetElement
  function renderTweets(tweetData) {
    $(".tweets-container").empty();
    for (let i = 0; i < tweetData.length; i++) {
      let tweet = tweetData[i];

      const $tweet = createTweetElement(tweet)
      //append all the information
      $(".tweets-container").prepend($tweet);
    }
  }

  function loadTweets() {
    $.ajax ({
      url: "/tweets",
      method: "GET",
      success: function (post) {
        renderTweets(post);
      }
    });
  }

  $("#tweet-submit").on("submit", function (event) {
    event.preventDefault();

    //user tweet
    let text = $(".text-input").val().trim();

    if (text.length === null || text === "") {
      alert("Empty Tweet!");
    } else if (text.length > 140) {
      alert("Too many characters!");
    } else {
      // Start up spinner
      $.ajax ({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: function (post) {
          loadTweets();
          // stop spinner
          $(".text-input").val("");
        }
      });
    }
  });

  loadTweets();
});