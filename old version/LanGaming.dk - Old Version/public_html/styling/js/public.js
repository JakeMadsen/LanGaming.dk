(function () {
    getPageFunctions();
    
})();


function getPageFunctions(){
    var urlParameter = parseQueryString(),
        param = JSON.stringify(urlParameter);
        
        console.log(param)

    if (param != '{}') {
        console.log("Der er et parameter")
        if (urlParameter.skole_id != null)
            {
                
            }

    }else {

        }
}
function getPageName(){
    var pageName = window.location.pathname;
    pageName = filename = pageName.substring(pageName.lastIndexOf('/')+1);
    console.log("Current URL filename - " + pageName)
}
function parseQueryString (){
    var parseQueryString = function (url) {
        var urlParams = {};
        url.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3) {
                urlParams[$1] = $3;
            }
        );

        return urlParams;
    }

    var urlToParse = location.search;
    var url = parseQueryString(urlToParse);

    return url;
}

// Get data for "skoler.ejs"
function renderSchoolData(id){
    
}