// function 1
let createElemWithText = (element_name = "p", text = "", class_name) => 
{
  const element = document.createElement(element_name);
  element.textContent = text;
  if(class_name !== undefined) // interesting. Only add a class name if it is available.
  {
    element.classList.add(class_name);
  }
  return element;
}

// function 2
function createSelectOptions(json_data)
{
  // if undefined
  if(json_data === undefined)
    return undefined;

  let arr = [];

  json_data.forEach(user => 
  {
    let element = document.createElement("option");
    // an option element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
    element.value = user.id;
    element.textContent = user.name;
    arr.push(element);
  });
  return arr;
}

// function 3
let toggleCommentSection = function(postId)
{
  if (postId == null || postId == undefined)
    return;

  // important link: https://bobbyhadz.com/blog/javascript-get-element-by-attribute
  let section = document.querySelector(`section[data-post-id="${postId}"]`); // this was difficult to find
  // translates to: get the element whose attribute === post_id

  if(typeof(section) !== undefined && section != null) // checking if it exists
  {
    section.classList.toggle("hide");
  }
  else
    return null;

  return section; // after confirming it exists and toggling
}

// function 4
function toggleCommentButton(postId) // easey to solve after solving function 3
{
  if (postId == null || postId == undefined)
    return;

  // important link: https://bobbyhadz.com/blog/javascript-get-element-by-attribute
  let button = document.querySelector(`button[data-post-id="${postId}"]`); // this was difficult to find
  // translates to: get the element whose attribute === post_id

  if(typeof(button) !== undefined && button != null) // checking if it exists
  {
                                            // if true        // if false
    button.textContent === "Show Comments"? button.textContent = "Hide Comments" : button.textContent = "Show Comments";
  }
  else
    return null;

  return button; // after confirming it exists and manually toggling
}

// function 5
let deleteChildElements = (parentElement) => 
{
  // thanks to https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
  if(parentElement === undefined || !(parentElement instanceof Element)) // if a parameter is not an HTML element
    return undefined;
  
  let child_var = parentElement.lastElementChild;

  while(child_var)
  {
    parentElement.removeChild(parentElement.lastElementChild);
    child_var = parentElement.lastElementChild;
  }
  return parentElement;
}

// function 6
function addButtonListeners()
{
  let buttons = document.querySelectorAll("main button");
  if(buttons === undefined || buttons === null)
    return undefined;
  buttons.forEach(button => 
  {
    let postID = button.dataset.postId;
    button.addEventListener("click", function(e){toggleComments(e, postID)}, false);
  });
  return buttons;
}

// function 7
// refer to function 6 in order to complete it
function removeButtonListeners()
{
  let buttons = document.querySelectorAll("main button");
  if(buttons === undefined || buttons === null)
    return undefined;
  
  buttons.forEach(button => 
  {
    let postID = button.dataset.postId;
    button.removeEventListener("click", function(e){toggleComments(e, postID)}, false);
  });
  return buttons;
}

// function 8
function createComments(json_comments)   // uses createElemWithText
{
  if(!json_comments) // interesting implementation as well
    return;

  const fragment = document.createDocumentFragment();
  json_comments.forEach(comment => 
  {
    let article = document.createElement("article");
    let h3 = createElemWithText("h3", comment.name);
    let p1 = createElemWithText("p", comment.body);
    let p2 = createElemWithText("p", `From: ${comment.email}`);
    article.append(h3, p1, p2);
    fragment.appendChild(article);
  });
  return fragment;
}

// function 9
let populateSelectMenu = function(json_data)   // depends on createSelectOptions
{
  if(!json_data)
    return;

  const menuElement = document.querySelector("#selectMenu");
  const option_elems = createSelectOptions(json_data);
  option_elems.forEach(option => 
  {
    menuElement.append(option);
  });
  return menuElement;
}

// (these functions use Async/Await)
// function 10 
let getUsers = async() => 
{
  try // need to use try/catch block
  {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonUsers = await response.json();
    return jsonUsers;
  }
  catch(e){
    console.log(e);
  }
}

// function 11
let getUserPosts = async(user_id) =>
{
  if(!user_id)
    return;
  try
  {
    let arrPost = [];
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsonPosts = await response.json();
    jsonPosts.forEach(post => 
    {
      if(post.userId === user_id)
      {
        arrPost.push(post);
      }
    });
    return arrPost;
  }
  catch(e)
  {
    console.log(e);
  }
}

// function 12
let getUser = async(user_id) => 
{
  if(!user_id)
    return;
  try
  {
    let user_obj = {};
    let users = await getUsers();
    users.forEach(user => 
    {
      if(user.id === user_id)
        user_obj = user;
    });
    return user_obj;
  }
  catch(e)
  {
    console.log(e);
  }
}

// function 13
let getPostComments = async(post_id) => 
{
  if(! post_id)
    return;
  try
  {
    let comments = [];
    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    const jsonComments = await response.json();
    jsonComments.forEach(comment => 
    {
      if(comment.postId === post_id)
        comments.push(comment);
    });
    return comments;
  }
  catch (e)
  {
    console.log(e);
  }
}

// (these functions will depend on functions 10-13)

// function 14
let displayComments = async(post_id) =>
{
  if(!post_id)
    return;
  let section_elem = document.createElement("section");
  section_elem.dataset.postId = post_id;
  section_elem.classList.add("comments", "hide");
  let comments = await getPostComments(post_id);
  let fragment = createComments(comments);
  section_elem.append(fragment);
  return section_elem;
}

// function 15
let createPosts = async(posts_json_data) => 
{
  if(!posts_json_data)
    return;

  const fragment = document.createDocumentFragment();
  for(const post of posts_json_data)
  {
    let article = document.createElement("article");

    let h2 = document.createElement("h2");
    h2.textContent = post.title;

    let p1  = document.createElement("p");
    p1.textContent = post.body;

    let p2 = document.createElement("p");
    p2.textContent = `Post ID: ${post.id}`;

    const author = await getUser(post.userId);
    let p3 = document.createElement("p");
    p3.textContent = `Author: ${author.name} with ${author.company.name}`;

    let p4 = document.createElement("p");
    p4.textContent = author.company.catchPhrase;

    let button = document.createElement("button");
    button.textContent = "Show Comments";
    button.dataset.postId = post.id;
    
    const section = await displayComments(post.id);

    article.append(h2, p1, p2, p3, p4, button, section);

    article.append(section);
    fragment.append(article);
  }
  return fragment;
}

// function 16
async function displayPosts(posts)
{
  let main = document.querySelector("main");
  let element = !posts? document.querySelector("p") : await createPosts(posts); // p refers to the default paragraph
  main.append(element);
  return element;
}

// the last functions: procedural functions
// function 17
function toggleComments(event, postId)
{
  if(!event || !postId)
    return;
  event.target.listener = true;
  let button = toggleCommentButton(postId);
  let section = toggleCommentSection(postId);
  return [section,  button];
}

// function 18
async function refreshPosts(json_data)
{
  if(!json_data)
    return;
  let main = document.querySelector("main");
  let removeButtons = removeButtonListeners();
  main = deleteChildElements(main);
  let fragment = await displayPosts(json_data);
  let addButtons = addButtonListeners();
  return [removeButtons, main, fragment, addButtons];
}

// function 19
async function selectMenuChangeEventHandler(event)
{
  if(!event)
      return;

  document.querySelector("#selectMenu").disabled = true; // disables it

  let userId = event?.target?.value || 1;
  let posts = await getUserPosts(userId);
  let refreshPostsArray = await refreshPosts(posts);

  document.querySelector("#selectMenu").disabled = false; // enables it
  return [userId, posts, refreshPostsArray];
}

// function 20
async function initPage()
{
  let users = await getUsers();
  let select = populateSelectMenu(users);
  return [users, select];
}

