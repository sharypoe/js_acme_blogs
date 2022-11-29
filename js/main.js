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