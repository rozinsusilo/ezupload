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
        build(this, settings)
        return this
    }

    $.fn.ezupload.defaults = {
        multiple: true,
        allowedExtension: [],
        maxFileSize: null,
        //showSize: false,
        //width: "100%",
        name: "files"
    }

    function addItem(choosedFile, wrapper, newFile, settings) {
        //validate
        if(settings.allowedExtension.length > 0) {
            const message = `The allowed file extension is ${settings.allowedExtension.join(', ')}`
            const fileExt = choosedFile.name.split('.').pop()
            if(!settings.allowedExtension.includes(fileExt)) {
                alert(message)
                newFile.remove()
                return false
            }
        }
        if(settings.maxFileSize !== null) {
            const message = `Maximum file size is ${settings.maxFileSize} KB`
            if(settings.maxFileSize < (choosedFile.size/1000)) {
                alert(message)
                newFile.remove()
                return false
            }
        }

        const newFileHtml = $(`<div class="ez-list-item"></div>`)
        const fileInfo = $(`<div><h3 class="ez-item-header">${choosedFile.name}</h3><small>${formatSize(choosedFile.size)}</small></div>`)
        const deleteFileButton = $(`<button class="ez-delete-item"><svg id="Capa_1" enable-background="new 0 0 24 24" height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m442.154 145c10.585 0 17.924-10.701 13.955-20.514-14.093-34.841-48.275-59.486-88.109-59.486h-18.414c-6.867-36.273-38.67-65-77.586-65h-32c-38.891 0-70.715 28.708-77.586 65h-18.414c-39.834 0-74.016 24.645-88.109 59.486-3.969 9.813 3.37 20.514 13.955 20.514zm-202.154-115h32c21.9 0 40.49 14.734 46.748 35h-125.496c6.258-20.266 24.848-35 46.748-35z"/><path d="m111.053 470.196c1.669 23.442 21.386 41.804 44.886 41.804h200.121c23.5 0 43.217-18.362 44.886-41.804l21.023-295.196h-331.938zm185.966-214.945c.414-8.274 7.469-14.655 15.73-14.232 8.274.414 14.646 7.457 14.232 15.73l-8 160c-.401 8.019-7.029 14.251-14.969 14.251-8.637 0-15.42-7.223-14.994-15.749zm-97.768-14.232c8.263-.415 15.317 5.959 15.73 14.232l8 160c.426 8.53-6.362 15.749-14.994 15.749-7.94 0-14.568-6.232-14.969-14.251l-8-160c-.413-8.273 5.959-15.316 14.233-15.73z"/></g></svg></button>`)
        deleteFileButton.on("click", function(){
            if(confirm("Continue delete item?")) {
                newFileHtml.remove()
            }
        })
        
        newFileHtml.append(fileInfo, deleteFileButton, newFile)
        if(!settings.multiple) {
            wrapper.html(newFileHtml)
        } else {
            wrapper.append(newFileHtml)
        }
    }

    function formatSize(size, withoutNotation = false) {
        let formattedSize = size / 1024
        let notation = 'KB'
        if(formattedSize > 1024){
            formattedSize = formattedSize / 1024
            notation = 'MB'
            if(formattedSize > 1024) {
                formattedSize = formattedSize / 1024
                notation = 'GB'
            }
        } 
        if(withoutNotation) {
            return formattedSize.toFixed(2)
        }
        return `${formattedSize.toFixed(2)} ${notation}`
    }

    function build(el, settings) {
        if(settings.multiple) settings.name = `${settings.name}[]`
        
        const html = $(`<div class="ezupload">
        <div class="ez-header"></div>    
        <div class="ez-list"></div>
        </div>`)
        const addFileButton = $(`<button class="ez-button">Add File</button>`)
        addFileButton.on('click', function() {
            const newFile = $(`<input type="file" name="${settings.name}" class="ez-input-file" style="display:none">`)
            newFile.trigger('click').on("change", function(){
                const choosedFile = newFile[0].files[0]
                const wrapper = html.find('.ez-list')
                addItem(choosedFile, wrapper, newFile, settings)
            })
        })

        let droppedFiles = false
        html.find('.ez-header').on("drag dragstart dragend dragover dragenter dragleave drop", function(e){
            e.preventDefault()
            e.stopPropagation()
        }).on("dragover dragenter", function() {
            $(this).addClass('is-dragover')
        }).on("dragleave dragend drop", function() {
            $(this).removeClass("is-dragover")
        }).on("drop", function(e) {
            droppedFiles = e.originalEvent.dataTransfer.files
            for(let i=0; i < droppedFiles.length; i++) {
                const choosedFile = droppedFiles[i]
                const newFile = $(`<input type="file" name="${settings.name}" class="ez-input-file" style="display:none">`)
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(choosedFile)
                newFile.prop('files', dataTransfer.files)

                const wrapper = html.find('.ez-list')
                addItem(choosedFile, wrapper, newFile, settings)
            }
        })

        html.find('.ez-header').append(addFileButton)
        el.append(html)
    }

}(jQuery))