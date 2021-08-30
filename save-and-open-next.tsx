const getExtension = (file: File) => {
    return file.name.split(".")[1];
};

const getSeqName = (file: File) => {
    return file.name.split(".")[0];
};

const getDesiredName = (file: File) => {
    const seqName = getSeqName(file);
    const desiredSeqName = seqName.substring(seqName.length - 4);
    return `${desiredSeqName}.${getExtension(file)}`;
};

const findIndexOfFile = (arr: File[], value: File) => {
    const indexes = [] as any[];

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];

        if (element.name == value.name) {
            indexes.push(i);
        }
    }

    return indexes[0];
};

const filterNotValidFiles = (files: File[]) => {
    const output = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const extension = getExtension(file);

        if (extension === "jpg" || extension === "JPG") {
            output.push(file);
        }
    }

    return output;
};

const openNext = (file: File) => {
    const allFiles = file.parent.getFiles();

    const images = filterNotValidFiles(allFiles);

    const index = findIndexOfFile(images, file);
    if (index < images.length - 1) app.open(images[index + 1]);
    else alert("No more photos");
};

const save = (file: File) => {
    const desiredName = getDesiredName(file);
    const desiredPath = file.parent;

    const saveOptions = new JPEGSaveOptions();
    saveOptions.quality = 12;

    app.activeDocument.saveAs(new File(desiredPath + "/" + desiredName), saveOptions);
    app.activeDocument.close();
};

const current = app.activeDocument.fullName;

save(current);
openNext(current);
