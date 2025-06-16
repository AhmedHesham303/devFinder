let username = "octocat";
const searchBtn = document.querySelector(".submit-search");
const input = document.querySelector(".search-area");
// 🖼️ Profile Image
const avatarImgEl = document.querySelector(".acount-img");

// 👤 Name
const nameEl = document.querySelector(".acount-name");

// 🆔 Username
const usernameEl = document.querySelector(".acount");

// 📅 Joined Date
const joinedDateEl = document.querySelector(".joining-date");

// 📝 Bio
const bioEl = document.querySelector(".user-bio");

// 📦 Repositories
const reposEl = document.querySelector(".number-of-repos");

// 👥 Followers
const followersEl = document.querySelector(".number-of-followers");

// ➕ Following
const followingEl = document.querySelector(".number-of-following");

// 📍 Location
const locationEl = document.querySelector(".lacation");

// 🐦 Twitter
const twitterEl = document.querySelector(".twitter");

// 🌐 Website
const websiteEl = document.querySelector(".githup");

// 🏢 Company
const companyEl = document.querySelector(".company");

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  username = input.value;
  const user = await loadUser(username);
  if (!user) return;

  const avatarUrl = user.avatar_url;
  const name = user.name;
  const createdAt = user.created_at;
  const repos = user.public_repos;
  const followers = user.followers;
  const following = user.following;
  const company = user.company;
  const twitter = user.twitter_username;
  const website = user.blog;
  const location = user.location;

  // console.log(user);
  // console.log("Avatar:", avatarUrl);
  // console.log("Name:", name);
  // console.log("Created At:", createdAt);
  // console.log("Repos:", repos);
  // console.log("Followers:", followers);
  // console.log("Following:", following);
  // console.log("Company:", company);
  // console.log("Twitter:", twitter);
  // console.log("Website:", website);
  // console.log("Location:", location);

  avatarImgEl.src = avatarUrl;
  nameEl.textContent = name || "Not Available";
  usernameEl.textContent = `@${user.login}`;
  joinedDateEl.textContent = `Joined ${new Date(createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )}`;
  bioEl.textContent = user.bio || "This profile has no bio";
  reposEl.textContent = repos;
  followersEl.textContent = followers;
  followingEl.textContent = following;
  locationEl.textContent = location || "Not Available";
  twitterEl.textContent = twitter || "Not Available";
  websiteEl.textContent = website || "Not Available";
  companyEl.textContent = company || "Not Available";

  // Example usage (console output)
});
async function loadUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const names = await response.json();
    return names;
  } catch (err) {
    console.log(err);
  }
}
