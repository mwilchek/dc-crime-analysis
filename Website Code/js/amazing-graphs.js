google.charts.load('current', {'packages':['corechart', 'bar', 'table', 'line', 'geochart', 'treemap'], 'mapsApiKey': 'AIzaSyBvMes4G9nnuE_4-4v37cc_UdSXKbTL6ns'});
google.charts.setOnLoadCallback(drawAllSheets);

/* ---------------------------------- Select Excel Tabs and Query Needed Columns --------------------------- */
function drawAllSheets() {
    drawSheetName('Offenses_by_Year', 'SELECT A,N', totalOffensesResponseHandler);
    drawSheetName('Offenses_by_Year', 'SELECT P,Q,R,S,T,U,V,W,X,Y', offense5YearBreakoutResponseHandler);
    drawSheetName('Offenses_by_Method_and_Year', 'SELECT A,B,O', offenseMethodsBreakoutResponseHandler);
    drawSheetName('Offenses_by_Year', 'SELECT AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ', offensesOverTimeResponseHandler);
    drawSheetName('Methods_by_Year', 'SELECT P,Q,R,S', totalMethodsOverTimeResponseHandler);
    drawSheetName('Seasonal_Crimes_by_Year', 'SELECT P,Q,R,S,T', seasonalCrimesOverTimeResponseHandler);
} //drawAllSheets

/* ----------------------------------------------- Function to Get Data ----------------------------------- */
function drawSheetName(sheetName, query, responseHandler) {
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query( 
        'https://docs.google.com/spreadsheets/d/1HMeXlJK1cAeZk0YLomhTvD5NZLZRsEUb-H2qcUotoxg/gviz/tq?sheet=' 
                + sheetName + '&headers=1&tq=' + queryString); //Query
    query.send(responseHandler);
} //drawSheetName

/* ------------------------------------------- Overview Tab Visualizations -------------------------------- */
function totalOffensesResponseHandler(response) {
    var data = response.getDataTable();
   
    // Format thousands to be comma delimited
    var formatter = new google.visualization.NumberFormat({
        pattern: '#,###',
        groupingSymbol: ','
    });
    formatter.format(data, 1);

    // Create value annotation for each bar
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        { calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation" 
        }
    ]);

    // Adjust chart area to fill all X-axis labels
    var options = {
        chartArea: {
            top: 28,
            height: '60%' 
         },
        title: 'Total Offenses',
        legend: { position: 'none'},
        bar: { groupWidth: '95%' },
        vAxis: {title: 'Number of Incidents'},
        hAxis: {
            count: -1, 
            viewWindowMode: 'pretty', 
            slantedText: true
        }  
      };

      var chart = new google.visualization.ColumnChart(document.getElementById("offenses_by_year_div"));
      chart.draw(view, options);
} // totalOffensesResponseHandler

function offense5YearBreakoutResponseHandler(response) {
    var data = response.getDataTable();
   
    // Format thousands to be comma delimited
    var formatter = new google.visualization.NumberFormat({
        pattern: '#,###',
        groupingSymbol: ','
    });
    formatter.format(data, 2);
    formatter.format(data, 3);
    formatter.format(data, 4);
    formatter.format(data, 5);
    formatter.format(data, 6);
    formatter.format(data, 7);
    formatter.format(data, 8);
    formatter.format(data, 9);

    // Adjust chart area to fill all X-axis labels
    var options = {
        title:'Offense Types from 2016 to 2020*',
        isStacked: true,
        legend: {
            position: 'right',
            alignment: 'center'
          },
        bar: { groupWidth: '75%' },
        vAxis: {title: 'Year', format: '#'},
        hAxis: {title: 'Number of Incidents'}
      };

      var chart = new google.visualization.BarChart(document.getElementById("offenses_5_year_breakout_div"));
      chart.draw(data, options);
} //offense5YearBreakoutResponseHandler

function offenseMethodsBreakoutResponseHandler(response) {
    var data = response.getDataTable();

    // Format thousands to be comma delimited
    var formatter = new google.visualization.NumberFormat({
        pattern: '#,###',
        groupingSymbol: ','
    });
    formatter.format(data, 2);

    var options = {
        title: 'Total Offense Incidents by Methods from 2010-2020*',
        highlightOnMouseOver: true,
        maxDepth: 1,
        maxPostDepth: 2,
        minHighlightColor: '#8c6bb1',
        midHighlightColor: '#9ebcda',
        maxHighlightColor: '#edf8fb',
        minColor: '#009688',
        midColor: '#f7f7f7',
        maxColor: '#ee8100',
        headerHeight: 15,
        fontColor: 'black',
        showScale: true,
        generateTooltip: showStaticTooltip
    };

    tree = new google.visualization.TreeMap(document.getElementById('offense_methods_div'));
    tree.draw(data, options);

    function showStaticTooltip(row, size, value) {
        return '<div style="background:#3396ff; border-style:solid">' +
                '<span style="font-family:Courier; color:white;">Number of selected incidents </br> with this method: ' + size + ' </div>';
      }

} //offenseMethodsBreakoutResponseHandler

function offensesOverTimeResponseHandler(response) {
    var data = response.getDataTable();

    var categories = ['THEFT/OTHER', 'THEFT F/AUTO', 'ROBBERY', 'MOTOR VEHICLE THEFT', 'ASSAULT W/DANGEROUS WEAPON', 'BURGLARY', 
                     'SEX ABUSE', 'HOMICIDE', 'ARSON'];
   
    // Format thousands to be comma delimited
    var formatter = new google.visualization.NumberFormat({
        pattern: '#,###',
        groupingSymbol: ','
    });
    formatter.format(data, 2);
    formatter.format(data, 3);
    formatter.format(data, 4);
    formatter.format(data, 5);
    formatter.format(data, 6);
    formatter.format(data, 7);
    formatter.format(data, 8);
    formatter.format(data, 9);

    var view = data.clone();
    var refreshButton = document.getElementById('b1');
    var removeButton = document.getElementById('b2');

    var options = {
        title: 'Offense Incident Trends from 2010 to 2019',
        curveType: 'function',
        legend: { position: 'right' },
        hAxis: {title: 'Year', format: '#'},
        vAxis: {title: 'Number of Incidents'}
      };

    var chart = new google.visualization.LineChart(document.getElementById('offense_trends_div'));

    function drawChart(data) {
        // Disabling the buttons while the chart is drawing.
        refreshButton.disabled = true;
        removeButton.disabled = true;
        google.visualization.events.addListener(chart, 'ready',
            function() {
              // Enabling only relevant buttons.
              refreshButton.disabled = (data.getNumberOfColumns() - 1) >= categories.length;
              removeButton.disabled = (data.getNumberOfColumns() - 1) < 2;
            });

        chart.draw(data, options);
      }

      function reload() {
        view = data.clone();
        drawChart(data);
      }
  
      refreshButton.onclick = function() {
        //re-draw chart with original data
        reload();
      }

      removeButton.onclick = function() {
        //Drop a column of the data then re-draw (will not work when 1 column is left)
        view.removeColumn(view.getNumberOfColumns() - 1);
        drawChart(view);
      }

      drawChart(data);

} //offensesOverTimeResponseHandler

function totalMethodsOverTimeResponseHandler(response) {
    var data = response.getDataTable();

    var categories = ['GUN', 'KNIFE', 'OTHERS'];
   
    // Format thousands to be comma delimited
    var formatter = new google.visualization.NumberFormat({
        pattern: '#,###',
        groupingSymbol: ','
    });
    formatter.format(data, 1);
    formatter.format(data, 2);
    formatter.format(data, 3);

    var view = data.clone();
    var refreshButton = document.getElementById('b3');
    var removeButton = document.getElementById('b4');

    var options = {
        title: 'Offense Method Trends from 2010 to 2019',
        curveType: 'function',
        legend: { position: 'right' },
        hAxis: {title: 'Year', format: '#'},
        vAxis: {title: 'Number of Incidents'}
      };

    var chart = new google.visualization.LineChart(document.getElementById('method_trends_div'));

    function drawChart(data) {
        // Disabling the buttons while the chart is drawing.
        refreshButton.disabled = true;
        removeButton.disabled = true;
        google.visualization.events.addListener(chart, 'ready',
            function() {
              // Enabling only relevant buttons.
              refreshButton.disabled = (data.getNumberOfColumns() - 1) >= categories.length;
              removeButton.disabled = (data.getNumberOfColumns() - 1) < 2;
            });

        chart.draw(data, options);
      }

      function reload() {
        view = data.clone();
        drawChart(data);
      }
  
      refreshButton.onclick = function() {
        //re-draw chart with original data
        reload();
      }

      removeButton.onclick = function() {
        //Drop a column of the data then re-draw (will not work when 1 column is left)
        view.removeColumn(view.getNumberOfColumns() - 1);
        drawChart(view);
      }

      drawChart(data);

} //totalMethodsOverTimeResponseHandler

function seasonalCrimesOverTimeResponseHandler(response) {
    var data = response.getDataTable();

    var categories = ['Winter', 'Spring', 'Autumn', 'Summer'];
   
    // Format thousands to be comma delimited
    var formatter = new google.visualization.NumberFormat({
        pattern: '#,###',
        groupingSymbol: ','
    });
    formatter.format(data, 1);
    formatter.format(data, 2);
    formatter.format(data, 3);

    var view = data.clone();
    var refreshButton = document.getElementById('b5');
    var removeButton = document.getElementById('b6');

    var options = {
        title: 'Seasonal Crime Trends from 2010 to 2020',
        curveType: 'function',
        legend: { position: 'right' },
        hAxis: {title: 'Year', format: '#'},
        vAxis: {title: 'Number of Incidents'}
      };

    var chart = new google.visualization.LineChart(document.getElementById('seasonal_crimes_div'));

    function drawChart(data) {
        // Disabling the buttons while the chart is drawing.
        refreshButton.disabled = true;
        removeButton.disabled = true;
        google.visualization.events.addListener(chart, 'ready',
            function() {
              // Enabling only relevant buttons.
              refreshButton.disabled = (data.getNumberOfColumns() - 1) >= categories.length;
              removeButton.disabled = (data.getNumberOfColumns() - 1) < 2;
            });

        chart.draw(data, options);
      }

      function reload() {
        view = data.clone();
        drawChart(data);
      }
  
      refreshButton.onclick = function() {
        //re-draw chart with original data
        reload();
      }

      removeButton.onclick = function() {
        //Drop a column of the data then re-draw (will not work when 1 column is left)
        view.removeColumn(view.getNumberOfColumns() - 1);
        drawChart(view);
      }

      drawChart(data);
} //seasonalCrimesOverTimeResponseHandler

/* ------------------------------------------- End of Google API Visualizations --------------------------- */
