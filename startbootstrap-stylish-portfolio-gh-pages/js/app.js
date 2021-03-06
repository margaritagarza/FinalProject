let homepercent;
let visitorpercent;
let visitorteam;
let hometeam;


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
        console.log(result)
        hometeam = result.Team;
        
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata-home");

        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");
        demographicInfo.append("h5").text( "HOME TEAM " + "\n");
        demographicInfo.append("h5").text( result.Team + "\n");
        demographicInfo.append("h5").text( "Implied Probability: " + Math.round((result.winpct*100))+"%" + "\n");

        
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
        console.log(result.Team)
        visitorteam = result.Team;
        
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata-visitor");

        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");
        demographicInfo.append("h5").text( "VISITOR TEAM " + "\n");
        demographicInfo.append("h5").text( result.Team  + "\n");
        demographicInfo.append("h5").text( "Implied Probability: " + Math.round((result.winpct*100))+"%" + "\n");


        
        
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
    var ProbabilidadLocal = (Local/(Local + Visitante))*100
    var ProbablidadVisitante = (Visitante /(Local + Visitante))*100
    var OTLocal = ( 1/ProbabilidadLocal)*100
    var OTVisitante  =( 1/ProbablidadVisitante)*100
    document.getElementById("calculation").innerHTML="<h5> Outcome Probability <br> Home Team Probability:     "+Math.round( ProbabilidadLocal)+"%"+"<br>Visitor Team Probability:  "+Math.round(ProbablidadVisitante)+"%"+
     "<br>Home Team ODDS/MOMIO:    "+Number(OTLocal.toFixed(2))+"<br>Visitor Team ODDS/MOMIO:    "+Number(OTVisitante.toFixed(2))+"</h5>";

            

    
    var variable1 = [ ProbabilidadLocal,
        ProbablidadVisitante]

    console.log(variable1)
    console.log(hometeam)

    var barData = [
        {
          y:  [ Math.round(ProbabilidadLocal),
            Math.round(ProbablidadVisitante)],
          x: [hometeam, visitorteam],          
          type: "bar",
        }
      ];

      var barLayout = {
        title: "Model prediction-Probability of Winning % ",
        margin: { t: 50, l: 150 }
      };
      Plotly.newPlot("bar", barData, barLayout)
    
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

        var Teamname = ['Dodgers','Padres','Rays','Yankees','Indians','Braves','Twins','Reds','White Sox','Athletics'];

        var Teamprobability = [0.72,0.64,0.6,0.6,0.59,0.59,0.58,0.56,0.56,0.55];

        var trace1 = {
        type: 'scatter',
        x: Teamprobability,
        y: Teamname,
        mode: 'markers',
        name: 'Probability',
        marker: {
            color: 'rgba(156, 165, 196, 0.95)',
            line: {
            color: 'rgba(156, 165, 196, 1.0)',
            width: 1,
            },
            symbol: 'circle',
            size: 16
        }
        };


        var databar = [trace1];

        var layout = {
        title: 'Top 10 Teams with Highest Implied Probability',
        xaxis: {
            showgrid: false,
            showline: true,
            linecolor: 'rgb(102, 102, 102)',
            titlefont: {
            font: {
                color: 'rgb(204, 204, 204)'
            }
            },
            tickfont: {
            font: {
                color: 'rgb(102, 102, 102)'
            }
            },
            autotick: true,
            dtick: 10,
            ticks: 'outside',
            tickcolor: 'rgb(102, 102, 102)'
        },
        margin: {
            l: 140,
            r: 40,
            b: 50,
            t: 80
        },
        width: 1200,
        height: 600,
        paper_bgcolor: 'rgb(254, 247, 234)',
        plot_bgcolor: 'rgb(254, 247, 234)',
        hovermode: 'closest'
        };

        Plotly.newPlot('myDiv', databar, layout);

    });
}

init();
