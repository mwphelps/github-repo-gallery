// Global variables

// variable for overview class - This is where my profile information will appear
const overview = document.querySelector(".overview");
// variable for my github user name
const username = "mwphelps";
// variable for repo-list
const repoList = document.querySelector(".repo-list");

// async function to get user data 
// (called by )
const getUserInfo = async function() {
    const request = await fetch(
        `https://api.github.com/users/${username}`
    )
    const data = await request.json();
    displayUser(data);
    getRepoInfo();
    //console.log(data);
};

// a function to display user information
// (called by getUserInfo function)

const displayUser = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`
    overview.append(div);
};

// async function to get repository list data 
// (called by getUserInfo)

const getRepoInfo = async function() {
    const request = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated?per_page=100`
    );
    const data = await request.json();
    displayRepos(data);
    console.log(data);
};

// a function to display repo information
// (called by getRepoInfo function)

const displayRepos = function(repos) {
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

getUserInfo();