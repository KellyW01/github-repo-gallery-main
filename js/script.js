const overview = document.querySelector(".overview"); //where profile info will appear
const username = "KellyW01";
const repoList = document.querySelector(".repo-list");



const profile = async function(){
    const response = await fetch (`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log ({data});
    userInfo(data);
};
profile ();

const userInfo = function(data){
    const avatar = data.avatar_url;
    const name = data.name;
    const bio = data.bio;
    const location = data.location;
    const publicRepos = data.public_repos;
    
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-info");
    userDiv.innerHTML = 
    `<figure>
    <img alt="user avatar" src=${avatar} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Bio:</strong> ${bio}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Number of public repos:</strong> ${publicRepos}</p>
    </div>`;
    overview.append(userDiv);
}

const myPublicRepos = async function (){
    const repoResponse = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = repoResponse.json;
    console.log({repoData});
}
myPublicRepos();