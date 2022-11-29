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
  if (postId === undefined)
    return undefined;

  // important link: https://bobbyhadz.com/blog/javascript-get-element-by-attribute
  let section = document.querySelector(`[data-post-id="${postId}"]`); // this was difficult to find
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
  if (postId === undefined)
  return undefined;

  // important link: https://bobbyhadz.com/blog/javascript-get-element-by-attribute
  let button = document.querySelector(`[data-post-id="${postId}"]`); // this was difficult to find
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
