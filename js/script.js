const overview = document.querySelector(".overview"); //where profile info will appear
const username = "KellyW01";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const profile = async function(){
    const response = await fetch (`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log ({data});
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
    //console.log({repos}); //15 objects each with a set of keyvalue pairs
    displayRepos(repos);
}
myPublicRepos();

//display repos
const displayRepos = function (repos){
filterInput.classList.remove("hide");
    for (let eachMethodArray of repos){ //for each of the method arrays in the repos data
        const listItem = document.createElement("li"); //create a li element
        listItem.classList.add("repo"); //give class name to li
        let repoName = eachMethodArray.name; // for each of the method arrays in the repos method collection, grab the key value pair

        listItem.innerHTML = `<h3>${repoName}</h3>`;
        repoList.append(listItem);
        //console.log({repoName});
        
    }
    
};
//event listener that allows the user to click on an individual repo's title to show the repo info.  

//This click event is for the entire ul full of repos
repoList.addEventListener("click", function (e){
    
    if (e.target.matches("h3")){ //capture when the user clicks on the title of an individual repo
        const repoName = e.target.textContent; //event target
        //pull the inner text of the h3 clicked
        
        //console.log({repoName}); //it's working!
        //grab the element's text and pull the corresponding data for the repo with the same name
        specificRepo(repoName);
    }
    
});

const specificRepo = async function(repoName){
    const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    //console.log({repoInfo}); 
    const fetchLanguages = await fetch (repoInfo.languages_url); //don't need to fetch the whole thing again, use dot notation to grab more info
    const languageData = await fetchLanguages.json();
    //console.log({languageData}); // method(languageData:) key:value CSS:1665 HTML:1905 JavaScript:1271
    const languages = [];
        for (let key in languageData){
            languages.push(key);
        }
        //console.log({languages});
    displayRepoInfo(repoInfo, languages);    
};

const displayRepoInfo = function (repoInfo, languages){
    //empty the html of the section w/ a class of repo-data where the individual repo data will appear.
    repoData.innerHTML = '';

    //create a new div element and add the selected repository's name, description, default branch and link to its code on GitHub
    let newDiv = document.createElement("div");
    newDiv.innerHTML=
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch
    }</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.clone_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    //inside the 5 placeholders, use the json data to grab the properties
repoData.append(newDiv);
    //append the new div element to the section with a class of repo-data
repoData.classList.remove("hide");
    //(show) the repo data element
reposSection.classList.add("hide");
    //hide element with the class of repos
backToReposButton.classList.remove("hide");    
    //Now the user will see the Back to Repo Gallery button when they click on a repo name. 
};

backToReposButton.addEventListener("click", function(){
    reposSection.classList.remove("hide");
    repoData.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
    const userInput = e.target.value;
    const lowerUserInput = userInput.toLowerCase();
    const repos = document.querySelectorAll(".repo");
    
    //console.log({userInput}, {lowerUserInput}); //these work
    //Loop through each repo inside your repos element.  Check to see if the lowercase repo text includes the lowercase search text
    for (listItem of repos) { //for each item in repos
        let lowerRepo = listItem.innerText.toLowerCase(); 

        if (lowerRepo.includes(lowerUserInput)){
            //lowerRepo.classList.remove("hide")
            //need to show the li.repo that includes letters from the lowerUserInput
        console.log("true");
    }
        else {
            
            listItem.classList.add("hide"),
            //hide li.repo that doesnt include letters from the userinput
            console.log("false");}
        //console.log({lowerRepo},{lowerUserInput});
    }
});
        //If the repo contains the text, show it. If it doesn’t contain the text, hide the repo.