google.charts.load('current', {'packages':['corechart', 'bar', 'table', 'line', 'geochart'], 'mapsApiKey': 'AIzaSyBvMes4G9nnuE_4-4v37cc_UdSXKbTL6ns'});
google.charts.setOnLoadCallback(drawAllSheets);

/* ---------------------------------- Select Excel Tabs and Query Needed Columns --------------------------- */
function drawAllSheets() {
    drawSheetName('SpendingSummary', 'SELECT A,B,C,D', spendingSummaryResponseHandler);
    drawSheetName('SpendingSummary', 'SELECT A,C,E', spendingSummaryOtherVsMilitaryResponseHandler);
    drawSheetName('CountryGDPInMillions', 'SELECT B,J,N,O', averageHealthcareAndGDPResponseHandler);
    drawSheetName('HealthcareSpendingInMillions', 'SELECT Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC', spendingSummaryHealthcareResponseHandler);
    drawSheetName('HealthcareSpending_PerPerson', 'SELECT A,I,M,N', averageSpendingPerPersonHealthcareResponseHandler);
    drawSheetName('HealthcareSpending_PerPerson', 'SELECT P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB', spendingSummaryPerPersonHealthcareResponseHandler);
    drawSheetName('HealthcareSpendingInMillions', 'SELECT A,AE,AF,AG,AH,AI', spendingHealthcareGrowthResponseHandler);
    drawSheetName('CountryGDPInMillions', 'SELECT B,J,S,T', averageEducationAndGDPResponseHandler);
    drawSheetName('EducationSpendingPercentByGDP', 'SELECT I,J,K,L,M,N,O,P,Q,R,S,T,U', spendingEducationPercentResponseHandler);
    drawSheetName('EducationSpending_PerPerson', 'SELECT A,G', spendingEducationPerPersonResponseHandler);
    drawSheetName('EducationSpendingInMillions', 'SELECT A,K,L,M,N', spendingEducationGrowthResponseHandler);
    drawSheetName('CountryGDPInMillions', 'SELECT B,J,W,X', averageMilitaryAndGDPResponseHandler);
    drawSheetName('MilitarySpendingInMillions', 'SELECT N,O,P,Q,R,S,T,U,V,W,X,Y,Z', spendingSummaryMilitaryResponseHandler);
    drawSheetName('MilitarySpending_PerPerson', 'SELECT A,J,K', spendingMilitaryPerPersonResponseHandler);
} //drawAllSheets

/* ----------------------------------------------- Function to Get Data ----------------------------------- */
function drawSheetName(sheetName, query, responseHandler) {
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1x2u8sHBYsv2f1CVA_L_BIq_f2wikiOgTh7kjj5RAJes/gviz/tq?sheet=' 
                + sheetName + '&headers=1&tq=' + queryString); //Query
    query.send(responseHandler);
} //drawSheetName

/* ------------------------------------------- Overview Tab Visualizations -------------------------------- */