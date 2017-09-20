function header(){
    const pageBody = document.getElementById("nav-block");
    const nav = document.createElement("nav");
    nav.classList.add("row");
    
    const logo = document.createElement("p");
    logo.innerHTML="Lucian Voju";
    
    const ul = document.createElement("ul");
    ul.classList.add("main-nav");
    
    const contactUs = document.createElement("a");
    contactUs.innerHTML = "Contact Us";
    
    ul.appendChild(contactUs);
    nav.appendChild(logo);
    nav.appendChild(ul);
    
    pageBody.appendChild(nav);
}