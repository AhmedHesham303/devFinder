let username = "octocat";
const searchBtn = document.querySelector(".submit-search");
const input = document.querySelector(".search-area");

const containerEl = document.querySelector(".main-area");
const errMess = document.querySelector(".error-mes");
function handelSearch() {
  searchBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    username = input.value;
    const user = await loadUser(username);
    console.log(user);
    let html;
    if (user.status == "404") {
      html = `
      <h2 class = "error-header">No results found!</h2>
      <p class = "error-text">We couldn’t find any GitHub users matching your search. Please double-check the username and try again.</p>
      `;
      containerEl.innerHTML = html;
      console.log(errMess);
      errMess.style.display = "block";
      return;
    }
    errMess.style.display = "none";

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

    html = `<header class="main-area-header">
            <img
              class="acount-img"
              src="./assets/Profile Picture.png"
              alt="The Octocat's profile picture"
            />
            <div class="acount-name-info">
              <div>
                <h2 class="acount-name">The Octocat</h2>
                <p class="acount">@octocat</p>
              </div>

              <time class="joining-date" datetime="2011-01-25"
                >Joined 25 Jan 2011</time
              >
            </div>
          </header>

          <!-- Bio -->
          <section class="profile-info">
            <p class="user-bio">This profile has no bio</p>

            <!-- Repo / Follower Stats -->
            <section class="number-info" aria-label="GitHub Statistics">
              <dl>
                <div>
                  <dt>Repos</dt>
                  <dd class="number-of-repos">8</dd>
                </div>
                <div>
                  <dt>Followers</dt>
                  <dd class="number-of-followers">3938</dd>
                </div>
                <div>
                  <dt>Following</dt>
                  <dd class="number-of-following">9</dd>
                </div>
              </dl>
            </section>

            <!-- Additional Info -->
            <aside class="another-info" aria-label="User Additional Info">
              <ul class="another-info-list">
                <li>
                  <img
                    class="location-icon"
                    src="./assets/icon-location.svg"
                    alt=""
                  />
                  <span class="lacation">San Francisco</span>
                </li>
                <li>
                  <img
                    class="twitter-icon"
                    src="./assets/icon-twitter.svg"
                    alt=""
                  />
                  <span class="twitter">Not Avilable</span>
                </li>
                <li>
                  <img
                    class="website-icon"
                    src="./assets/icon-website.svg"
                    alt=""
                  />
                  <a class="githup" href="https://githup.blog"
                    >https://githup.blog</a
                  >
                </li>
                <li>
                  <img
                    class="company-icon"
                    src="./assets/icon-company.svg"
                    alt=""
                  />
                  <span class="company">@githup</span>
                </li>
              </ul>
            </aside>
          </section>`;
    containerEl.innerHTML = html;
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
    if (websiteEl) websiteEl.href = website;
    companyEl.textContent = company || "Not Available";
  });
}

async function loadUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const names = await response.json();
    return names;
  } catch (err) {
    console.log(err);
  }
}
handelSearch();
