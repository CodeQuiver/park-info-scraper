var setupDate = function () {
    var d = new Date();
    var formattedDate = "";

    formattedDate += (d.getMonth() + 1) + "_";

    formattedDate += d.getDate() + "_";
    
    formattedDate += d.getFullYear();
};

//studying note- uses built-in JS date constructor function
    // all the methods are also built-in
    // note that getMonth has an additional +1 because the months are numbered from zero by JS, so we add 1 to adjust to our method of counting from 1

module.exports = setupDate;