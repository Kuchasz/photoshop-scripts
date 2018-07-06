"use strict";
var getExtension = function (file) {
    return file.name.split(".")[1];
};
var getSeqName = function (file) {
    return file.name.split(".")[0];
};
var getDesiredName = function (file) {
    var seqName = getSeqName(file);
    var desiredSeqName = seqName.substring(seqName.length - 4);
    return desiredSeqName + "." + getExtension(file);
};
var findIndexOfFile = function (arr, value) {
    var indexes = [];
    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        if (element.name == value.name) {
            indexes.push(i);
        }
    }
    return indexes[0];
};
var filterNotValidFiles = function (files) {
    var output = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var extension = getExtension(file);
        if (extension === "jpg" || extension === "JPG") {
            output.push(file);
        }
    }
    return output;
};
var openNext = function (file) {
    var allFiles = file
        .parent
        .getFiles()
        .sort(function (a, b) { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
    var images = filterNotValidFiles(allFiles);
    var index = findIndexOfFile(images, file);
    if (index < images.length - 1)
        app.open(images[index + 1]);
    else
        alert("No more photos");
};
var save = function (file) {
    var desiredName = getDesiredName(file);
    var desiredPath = file.parent;
    var saveOptions = new JPEGSaveOptions();
    saveOptions.quality = 8;
    $.write(desiredPath + "/" + desiredName);
    app.activeDocument.saveAs(new File(desiredPath + "/" + desiredName), saveOptions);
    app.activeDocument.close();
};
var current = app.activeDocument.fullName;
save(current);
openNext(current);
