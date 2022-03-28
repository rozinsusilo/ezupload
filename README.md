Simple jquery uploader with bootstrap style

Requirement:
1. jquery 3.6.0

How to use:
$("#uploadFile").ezupload({
    //options
    allowedExtension: ['jpg', 'png'], //extension
    multiple: true,
    maxFileSize: null,
    name: "files"
});
