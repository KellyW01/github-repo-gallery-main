const overview = document.querySelector(".overview"); //where profile info will appear
const username = "KellyW01";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


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
    const repos = await repoResponse.json();
    console.log({repos}); //15 objects each with a set of keyvalue pairs
    displayRepos(repos);
}
myPublicRepos();

//display repos
const displayRepos = function (repos){

    for (let eachMethodArray of repos){ //for each of the method arrays in the repos data
        const listItem = document.createElement("li"); //create a li element
        listItem.classList.add("repo"); //give class name to li
        let repoName = eachMethodArray.name; // for each of the method arrays in the repos method collection, grab the key value pair

        listItem.innerHTML = `<h3> ${repoName}</h3>`;
        repoList.append(listItem);
        console.log({repoName});
        
    }
    
};
//event listener that allows the user to click on an individual repo's title to show the repo info.  

//This click event is for the entire ul full of repos
repoList.addEventListener("click", function (e){
    
    if (e.target.matches("h3")){ //capture when the user clicks on the title of an individual repo
        const repoName = e.target.textContent; //event target
        //pull the inner text of the h3 clicked
        
        console.log({repoName}); //it's working!
        //grab the element's text and pull the corresponding data for the repo with the same name
        specificRepo(repoName);
    }
    
});

const specificRepo = async function(repoName){
    const specificResponse = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const specificRepoData = await specificResponse.json();
    console.log({specificRepoData}); 
    const fetchLanguages = await fetch (``)
}
