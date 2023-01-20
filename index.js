import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// const tweetBtn = document.querySelector("#tweet-btn");

console.log(tweetsData);

// tweetBtn.addEventListener("click", function () {
//   handleTweetBtnClick();
// });

document.addEventListener("click", function (event) {
  if (event.target.dataset.like) {
    handleLikeClick(event.target.dataset.like);
  } else if (event.target.dataset.retweet) {
    handleRetweetClick(event.target.dataset.retweet);
  } else if (event.target.dataset.reply) {
    handleReplyClick(event.target.dataset.reply);
  } else if (event.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

//when using 2 ifs both will run

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    // if (tweet.uuid === tweetId) {
    //   return true;
    // }

    //shorthand
    return tweet.uuid === tweetId;
  })[0];
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
    //targetTweetObj.isLiked = false;
  } else {
    targetTweetObj.likes++;
    //targetTweetObj.isLiked = true;
  }
  //shorthand
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  renderHtml();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

  renderHtml();
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
  const tweetInput = document.querySelector("#tweet-input");

  if (tweetInput.value) {
    tweetsData.unshift({
      handle: "@Scrimba",
      profilePic: "images/scrimbalogo.png",
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
    renderHtml();
    tweetInput.value = "";
  }
}

function getFeedHtml() {
  let feedHtml = "";

  tweetsData.forEach((tweet) => {
    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";

    if (tweet.replies.length > 0) {
      tweet.replies.forEach((reply) => {
        repliesHtml += `
        <div class="tweet-reply">
          <div class="tweet-inner">
            <img src="${reply.profilePic}" class="profile-pic">
              <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
              </div>
          </div>
        </div>
        `;
      });
    }

    feedHtml += `
    <div class="tweet">
      <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                ${tweet.retweets}
                </span>
            </div>   
        </div>            
      </div>
      <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
      </div>
    </div>`;
  });
  return feedHtml;
}

function renderHtml() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

renderHtml();

// characters.forEach(function(character, index){
//   console.log(index, character.title)
// })
