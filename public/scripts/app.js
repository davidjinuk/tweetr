//document ready
$(function () {

  $(".slide-toggle").click(function() {
    $(".new-tweet").slideToggle();
    $(".text-input").focus();
  });

  //ALTERNATIVE TO ALERT USER OF BAD TWEETS

  // $(this).validate ({
  //   rules: {
  //     text: {
  //       required: true,
  //       maxlength: 140
  //     },
  //     messages: {
  //       text: {
  //         required: "Empty Tweet!",
  //         maxlength: "Your tweet is too long!"
  //       },
  //       submitHandler: function(form) {
  //         form.submit();
  //       }
  //     }
  //   }
  // });

  $("#tweet-submit").on("submit", function (event) {
    event.preventDefault();

    //user tweet
    var text = $(".text-input").val().trim();

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

  function loadTweets() {
    $.ajax ({
      url: "/tweets",
      method: "GET",
      success: function (post) {
        renderTweets(post);
      }
    });
  }


  //send each user data to createTweetElement
  function renderTweets(tweetData) {
    $(".tweets-container").empty();
    for (var i = 0; i < tweetData.length; i++) {
      var tweet = tweetData[i];

      const $tweet = createTweetElement(tweet)
      //append all the information
      $(".tweets-container").prepend($tweet);
    }
  }

  function createTweetElement(tweet) {

    // ALTERNATIVE WAY TO CODE EVERYTHING OUT
    // let $tweet = `
    // <article class="tweet">
    //   <header>
    //     <img src="${tweet.user.avatars.small}" />
    //     <h2>${tweet.user.name}</h2>
    //   </header>
    // </article>
    // `;

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
    const userCreated = tweet.created_at;

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

  loadTweets();

});