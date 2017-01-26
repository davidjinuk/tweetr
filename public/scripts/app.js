/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//document ready
$(function () {

  $(".slide-toggle").click(function() {
    $(".new-tweet").slideToggle();
    $(".text-input").focus();
  });

  //NEW WAY TO FULLFILL REQUIREMENTS FOR FORM INPUT

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
    var text = $(this).serialize();
    text = text.slice(5);

    if (text.length === null || text === "") {
      alert("Empty Tweet!");
    } else if (text.length > 140){
        alert("Too many characters!");
    } else {
      $.ajax ({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: function (post) {
          console.log("Success: ", post);
          loadTweets();
        }
      });
    }
  });

  function loadTweets() {
    $.ajax ({
      url: "/tweets",
      method: "GET",
      success: function (post) {
        console.log("Success: ", post);
        renderTweets(post);
      }
    });
  }
  loadTweets();

  //send each user data to createTweetElement
  function renderTweets(tweetData) {
    $(".tweets-container").empty();
    for (var i = 0; i < tweetData.length; i++) {
      var user = tweetData[i];

      createTweetElement(user)
    }
  }

  function createTweetElement(tweet) {
    //elements
    var $tweet = $("<article>").addClass("tweet");
    var header = $("<header>");
    var image = $("<img>");
    var name = $("<h2>");
    var handle = $("<h6>");
    var content = $("<p>");
    var footer = $("<footer>");
    var time = $("<time>");

    //user data
    var userName = tweet.user.name;
    var userAvatar = tweet.user.avatars.small;
    var userHandle = tweet.user.handle;
    var userContent = tweet.content.text;
    var userCreated = tweet.created_at;

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

    //append all the information
    $(".tweets-container").append($tweet);

    return $tweet;
  }
  // renderTweets(tweetData);

});