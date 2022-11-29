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
    element.value = user.id;
    element.textContent = user.name;
    arr.push(element);
  });
  return arr;
}
