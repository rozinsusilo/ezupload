/**
 * Ezupload v1.0.0 
 * by Rozin Susilo
 * 
 * Copyright Rozin Susilo
 * Released under the MIT license
 */

(function ($) {
    $.fn.ezupload = function (options) {
        let settings = $.extend({}, $.fn.ezupload.defaults, options)
        build(this)
        return this
    }

    $.fn.ezupload.defaults = {
        multiple: true,
        allowedExtension: [],
        maxFileSize: null,
        showSize: false,
        width: "100%",
        name: "files"
    }

    function build(el) {
        const html = $(`<div class="ezupload">
        <div class="ez-header"></div>    
        <div class="ez-list"></div>
        </div>`)
        const addFileButton = $(`<button class="ez-button">Add File</button>`)
        addFileButton.on('click', function() {
            const newFile = $(`<input type="file" name="" class="ez-input-file">`)
            newFile.trigger('click').on("change", function(){
                const newFileHtml = $(`<div class="ez-list-item"></div>`)
                const fileInfo = $(`<div><h3 class="ez-item-header">Filename</h3><small>50 MB</small></div>`)
                const deleteFileButton = $(`<button class="ez-delete-item"></button>`)
                newFileHtml.append(fileInfo, deleteFileButton).appendTo()
                html.find('.ez-list').append(newFileHtml)
            })
        })
        html.find('.ez-header').append(addFileButton)
        el.append(html)
    }

    function formatSize() {

    }
}(jQuery))