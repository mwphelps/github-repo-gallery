// Global variables

// variable for overview class - This is where my profile information will appear
const overview = document.querySelector(".overview");
// variable for my github user name
const username = "mwphelps";
// variable to point to repo-list class in index
const repoList = document.querySelector(".repo-list");
// variable to point to repos class in index
const repos = document.querySelector(".repos");
// variable to point to repo-data class in index
const repoData = document.querySelector(".repo-data");
// variable to point to fliter-repos class in index
const filterRepos = document.querySelector(".filter-repos");
// variable to point to view-repos button class in index
const viewRepos = document.querySelector(".view-repos");

let repoListArray = []; // added to help with filter search

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
    //console.log(data);
};

// a function to display repo information
// (called by getRepoInfo function)

const displayRepos = function(repos) {
    filterRepos.classList.remove("hide");
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
        repoListArray.push(repo);
    }
};

// click event for repoList

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
        getSpecificRepo(repoName);
    }
});

// async function to grab specific repository info
// (called by repoList event listener)

const getSpecificRepo = async function(repoName) {
    const request = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await request.json();
    const fetchLanguages = repoInfo.languages_url;
    const requestLanguageInfo = await fetch (`${fetchLanguages}`);
    const languageInfo = await requestLanguageInfo.json();
    const languages = [];
    for (let key in languageInfo) {
        languages.push(key);
    }
    displaySpecificRepo(repoInfo, languages);
    //console.log(repoInfo);
    //console.log(languages);
};

// function to display specific repo info
// (called by getSpecificRepo)

const displaySpecificRepo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Defulat Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener"> View Repo on Github!</a>
            `
    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    viewRepos.classList.remove("hide");
};

// click event Listener to allow list of repos to be viewed again

viewRepos.addEventListener("click", function() {
    repoData.classList.add("hide");
    repos.classList.remove("hide");
    viewRepos.classList.add("hide");
});

// input event listener to search repos by name

filterRepos.addEventListener("input", function(e) {
    repoList.innerHTML = "";
    let filter = filterRepos.value;
    let filterLower = filter.toLowerCase();
    for (let repo of repoListArray) {
        if (repo.name.includes(filterLower)) {
            let li = document.createElement("li");
            li.classList.add("repo");
            li.innerHTML = `<h3>${repo.name}</h3>`;
            repoList.append(li);
        }
    }
});

getUserInfo();