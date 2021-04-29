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
        showSize: false
    }

    function build (el) {
        const html = `<div class="ezupload p-4 bg-secondary">
        <div class="ez-header"><button class="btn btn-primary">Add File</button></div>    
        <div class="ez-list></div>
        </div>`
        $(html).appendTo(el)
    }
}(jQuery))