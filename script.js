const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

inputBtn.addEventListener("click", saveLead);
tabBtn.addEventListener("click", saveTab);
deleteBtn.addEventListener("dblclick", deleteAll);

let myLeads = JSON.parse(localStorage.getItem("myLeads"));
if (myLeads === null)
    myLeads = [];

function saveLead() {
    if (inputEl.value)
        myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    load();
};

function saveTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads) );
        load();
    })
};

function load() {
    let listIterms = "";
    for (const iter of myLeads) {
        listIterms += `
        <li>
        <a target='_blank' href='${iter}'> ${iter} </a>
        </li>`
    }
    ulEl.innerHTML = listIterms;
}

function deleteAll() {
    myLeads = [];
    localStorage.clear();
    load();
}

load();
// localStorage.clear();