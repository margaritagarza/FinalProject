let homepercent;
let visitorpercent;



function getPlot(id) {

    // get the data from the json file
    d3.json("js/samples.json").then((data) => {
        console.log(data)

        var metadata = data.metadata;

        console.log(metadata)

        var result = metadata.filter(meta => meta.Team.toString() === id)[0];
        console.log(result.winpct)
        homepercent=result.winpct
            }
        )};


        
// create the function to get the necessary data
function getInfo(id) {
    // read the json file to get data
    d3.json("js/samples.json").then((data) => {

        var metadata = data.metadata;
        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.Team.toString() === id)[0];
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata-home");

        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

        
// create the function to get the necessary data
function getInfovisitor(id) {
    // read the json file to get data
    d3.json("js/samples.json").then((data) => {

        var metadata = data.metadata;
        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.Team.toString() === id)[0];
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata-visitor");

        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function getPlotvisitor(id) {

    // get the data from the json file
    d3.json("js/samples.json").then((data) => {
        console.log(data)

        var metadata = data.metadata;

        console.log(metadata)

        var result = metadata.filter(meta => meta.Team.toString() === id)[0];
        console.log(result.winpct)
        visitorpercent=result.winpct;
            }
        )};



 function myFunction() { console.log()

    var Local = 1.08*(homepercent*(1-visitorpercent))
    var Visitante = visitorpercent*(1-homepercent)
    var ProbalidadLocal = Local/(Local + Visitante)
    var ProbablidadVisitante = Visitante /(Local + Visitante)
    document.getElementById("calculation").innerHTML="ProbabilidadLocal"+ProbalidadLocal+"<br>Probabilidad Visitate"+ProbablidadVisitante

            
        
            };

// create the function for the change event
function optionChangedhome(id) {
    getPlot(id);
    getInfo(id);
    
}

// create the function for the change event
function optionChangedvisitor(id) {
    getPlotvisitor(id);
    getInfovisitor(id);
    
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdownhome = d3.select("#selDataset");
    var dropdownvisitor = d3.select("#selDatasetvisitor");

    // read the data 
    d3.json("js/samples.json").then((data) => {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdownhome.append("option").text(name).property("value");
        });

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdownvisitor.append("option").text(name).property("value");
        });
        
        // call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
        getPlotvisitor(data.names[0]);
        getInfovisitor(data.names[0]);

    });
}

init();