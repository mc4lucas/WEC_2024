//This scripts purpose is to read the csv file / database.
//Using the filereader API


var isAdding = false; //Variable for the adding menu



//Code just for the switch menus
document.getElementById("addDisaster").addEventListener("click", updateAddMenu); //Button listener for add disaster

window.onload = function setup(){
    document.getElementById("menu").style.display = "block";
    document.getElementById("addFile").style.display = "none";
}

function updateAddMenu(){
    if(isAdding == false){
        
        document.getElementById("menu").style.display = "none";
        document.getElementById("addFile").style.display = "block";

        isAdding = true;
    }
    else{
        
        document.getElementById("menu").style.display = "block";
        document.getElementById("addFile").style.display = "none";

        isAdding = false;
    }
}


document.getElementById("addBTN").addEventListener("click", addFile);

function addFile(){
    let Disaster = { //Create a new disaster
        Name : document.getElementById("N"),
        Longitude : document.getElementById("Long"),
        Latitude : document.getElementById("Lat"),
        Date : document.getElementById("D"),
        Intensity : document.getElementById("I"),
        Type : document.getElementById("C")
    };

    appendDisaster(Disaster);

}






const reader = new FileReader(); //The reader gains access to the csv file
document.getElementById("submitBTN").addEventListener("click", readFile); //When submit button is clicked it will run updateFile()
document.getElementById("try").addEventListener("click", parseData); //When submit button is clicked it will run updateFile()

//Buttons To Sort by Intensity
document.getElementById("sortIntensityLow").addEventListener("click", sortIntensityLow); //When submit button is clicked it will sort by accending numbers
document.getElementById("sortIntensityHigh").addEventListener("click", sortIntensityHigh); //When submit button is clicked it will sort by decending numbers

const dropDown = document.getElementById("sortVal"); //Getting the dropdown menu for sorting

dropDown.addEventListener("change", updateSorting);

function updateSorting(){
    if(dropDown.getAttribute("value") == "IA"){
        sortIntensityLow();
    }
    if(dropDown.getAttribute("value") == "ID"){
        sortIntensityHigh();
    }
}


//#region Variables
var entries = 0;
var data; //Var for the file data
var values = []; //Temp bin for all the data from file

    //Variables for our events
    var disasterList = [];


//#endregion

function readFile(){
    const file = document.getElementById("myFile"); //Route access to file
    //const file = fetch("MOCK_DATA.csv");

    reader.readAsText(file.files[0]); //Reads the file and fires the onload event

    reader.onload = () =>{
        data = reader.result;
    }

    //parseData();
}

function parseData(){
    var currentVal = ""; //Variable to store the current string

    for(let l = 0; l < data.length; l++){
        if(data[l] != ',' && data[l] != '\r' && data[l] != '\n'){
            currentVal += data[l];
        }else{
           values.push(currentVal); //Adds the string to the array
           currentVal = ""; //Reset the var 
           entries++;
        }
    }
    data.length = entries; //Cleanup

    for(let i = 7; i < values.length; i+=7){
        let Disaster = { //Create a new disaster
            Name : values[i],
            Longitude : values[i+1],
            Latitude : values[i+2],
            Date : values[i+3],
            Intensity : values[i+4],
            Type : values[i+5]
        };
    
        disasterList.push(Disaster); //Append that disaster
    }
    disasterList.length = entries; //Cleanup

    console.log("Disasters",disasterList); //Print the string


    //Temp
    createDisaster(disasterList);
}

function createDisaster(val){
    for (let i = 0; i < entries; i++){
        var currentDisaster = val[i];

        const newDisaster = document.createElement('div'); //Create an overall div for the disaster
        newDisaster.classList.add("Disaster"); //Add the css class
    
        const topPanel = document.createElement('div'); //Create the top panel
        topPanel.classList.add("topPanel"); //Add the css class
        newDisaster.appendChild(topPanel); //Add to the div
    
        const bottomPanel = document.createElement('div'); //Create the bottom panel
        bottomPanel.classList.add("topPanel"); //Add the css class
        newDisaster.appendChild(bottomPanel); //Add to the div
    
        const leftBox = document.createElement('div'); //Create the left box
        leftBox.classList.add("box"); //Add the css class
        const rightBox = document.createElement('div'); //Create the right box
        rightBox.classList.add("box"); //Add the css class
        //Add the box's to the panel
        topPanel.appendChild(leftBox);
        topPanel.appendChild(rightBox);
    
        //Add the name text
        const name = document.createElement("span");
        name.innerHTML = ("Name of Disaster: " + currentDisaster.Name);
        name.classList.add("disasterText"); //Add the css
        leftBox.appendChild(name);
    
        //Add the type text
        const disasterClass = document.createElement("span");
        disasterClass.innerHTML = ("Class of Disaster: " + currentDisaster.Type);
        disasterClass.classList.add("disasterText"); //Add the css
        leftBox.appendChild(disasterClass);
    
    
        //Add the location text
        const location = document.createElement("span");
        location.innerHTML = ("Location of Disaster: Long: " + currentDisaster.Longitude + " Lat: " + currentDisaster.Latitude);
        location.classList.add("disasterText"); //Add the css
        rightBox.appendChild(location);
    
        //Add the type text
        const date = document.createElement("span");
        date.innerHTML = ("Start of Disaster: " + currentDisaster.Date);
        date.classList.add("disasterText"); //Add the css
        rightBox.appendChild(date);
    
        //Add the Intensity text
        const intensity = document.createElement("span");
        intensity.innerHTML = ("Intensity of Disaster: " + currentDisaster.Intensity);
        intensity.classList.add("disasterText"); //Add the css
        bottomPanel.appendChild(intensity);
    
        document.getElementById("listing").appendChild(newDisaster);
        //document.body.append(newDisaster); //Actualy add the div to the body of the HTML
    }
}

function deleteAllDisasters(){
    const container = document.getElementById("listing");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

function sortIntensityLow(){
    deleteAllDisasters(); //Remove all children
    disasterList.sort((a,b) => a.Intensity - b.Intensity); //Sort by intensity
    createDisaster(disasterList); //Create the disasters again
}
function sortIntensityHigh(){
    deleteAllDisasters(); //Remove all children
    disasterList.sort((a,b) => b.Intensity - a.Intensity); //Sort by intensity
    createDisaster(disasterList); //Create the disasters again
}

function appendDisaster(val){

    var currentDisaster = val;

    const newDisaster = document.createElement('div'); //Create an overall div for the disaster
    newDisaster.classList.add("Disaster"); //Add the css class

    const topPanel = document.createElement('div'); //Create the top panel
    topPanel.classList.add("topPanel"); //Add the css class
    newDisaster.appendChild(topPanel); //Add to the div

    const bottomPanel = document.createElement('div'); //Create the bottom panel
    bottomPanel.classList.add("topPanel"); //Add the css class
    newDisaster.appendChild(bottomPanel); //Add to the div

    const leftBox = document.createElement('div'); //Create the left box
    leftBox.classList.add("box"); //Add the css class
    const rightBox = document.createElement('div'); //Create the right box
    rightBox.classList.add("box"); //Add the css class
    //Add the box's to the panel
    topPanel.appendChild(leftBox);
    topPanel.appendChild(rightBox);

    //Add the name text
    const name = document.createElement("span");
    name.innerHTML = ("Name of Disaster: " + currentDisaster.Name);
    name.classList.add("disasterText"); //Add the css
    leftBox.appendChild(name);

    //Add the type text
    const disasterClass = document.createElement("span");
    disasterClass.innerHTML = ("Class of Disaster: " + currentDisaster.Type);
    disasterClass.classList.add("disasterText"); //Add the css
    leftBox.appendChild(disasterClass);


    //Add the location text
    const location = document.createElement("span");
    location.innerHTML = ("Location of Disaster: Long: " + currentDisaster.Longitude + " Lat: " + currentDisaster.Latitude);
    location.classList.add("disasterText"); //Add the css
    rightBox.appendChild(location);

    //Add the type text
    const date = document.createElement("span");
    date.innerHTML = ("Start of Disaster: " + currentDisaster.Date);
    date.classList.add("disasterText"); //Add the css
    rightBox.appendChild(date);

    //Add the Intensity text
    const intensity = document.createElement("span");
    intensity.innerHTML = ("Intensity of Disaster: " + currentDisaster.Intensity);
    intensity.classList.add("disasterText"); //Add the css
    bottomPanel.appendChild(intensity);

    document.getElementById("listing").appendChild(newDisaster);
}




