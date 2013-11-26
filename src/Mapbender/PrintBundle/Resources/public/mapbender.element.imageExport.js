(function($) {

    $.widget("mapbender.mbImageExport",  {
        options: {},
        map: null,
        popupIsOpen: true,

        _create: function() {
            if(!Mapbender.checkTarget("mbImageExport", this.options.target)){
                return;
            }
            var self = this;
            var me = this.element;
            this.elementUrl = Mapbender.configuration.application.urls.element + '/' + me.attr('id') + '/';
            Mapbender.elementRegistry.onElementReady(this.options.target, $.proxy(self._setup, self));
        },

        _setup: function(){
            this.map = $('#' + this.options.target).data('mapbenderMbMap');

            this._trigger('ready');
            this._ready();
        },

        defaultAction: function(callback) {
            this.open(callback);
        },
        
        open: function(callback){
            this.callback = callback ? callback : null;
            var self = this;
            var me = $(this.element);
            this.elementUrl = Mapbender.configuration.application.urls.element + '/' + me.attr('id') + '/';
            if(!this.popup || !this.popup.$element){
                this.popup = new Mapbender.Popup2({
                        title: self.element.attr('title'),
                        draggable: true,
                        header: true,
                        modal: false,
                        closeButton: false,
                        closeOnPopupCloseClick: false,
                        closeOnESC: false,
                        content: self.element,
                        width: 250,
                        buttons: {
                                'cancel': {
                                    label: 'Cancel',
                                    cssClass: 'button buttonCancel critical right',
                                    callback: function(){
                                        self.close();
                                    }
                                },
                                'ok': {
                                    label: 'Export',
                                    cssClass: 'button right',
                                    callback: function(){
                                        self._exportImage();
                                    }
                                }
                        }
                    });
             } else {
                 if (this.popupIsOpen === false){
                    this.popup.open(self.element);
                 }
            }
            me.show();        
            this.popupIsOpen = true;
        },

        close: function() {
            if(this.popup){
                this.element.hide().appendTo($('body'));
                this.popupIsOpen = false;
                if(this.popup.$element){
                    this.popup.destroy();
                }
                this.popup = null;
            }
            this.callback ? this.callback.call() : this.callback = null;
        },

        
        /**
         *
         */
        ready: function(callback) {
            if(this.readyState === true) {
                callback();
            } else {
                this.readyCallbacks.push(callback);
            }
        },
        /**
         *
         */
        _ready: function() {
            for(callback in this.readyCallbacks) {
                callback();
                delete(this.readyCallbacks[callback]);
            }
            this.readyState = true;
        },
                
        _exportImage: function() {
            var sources = this.map.getSourceTree(), num = 0;
            var layers = new Array();
            
            for(var i = 0; i < sources.length; i++) {
                var layer = this.map.map.layersList[sources[i].mqlid];
                
                if(layer.olLayer.params.LAYERS.length === 0){
                    continue;
                }

                if(Mapbender.source[sources[i].type] && typeof Mapbender.source[sources[i].type].getPrintConfig === 'function') {
                    var temp = Mapbender.source[sources[i].type].getPrintConfig(layer.olLayer, this.map.map.olMap.getExtent());
                    layers[num] = temp['url'];
                    num++;
                }
            }
            if (num === 0){
                Mapbender.info('No active layer!');
            }else{
                console.log(layers);
                var self = this;
                
                var url =  Mapbender.configuration.application.urls.element + '/' + this.element.attr('id') + '/export';
                $.ajax({
                    url: url,
                    type: 'POST',
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(layers),
                    success: function(data) {
                        
                    }
                });
            }
        }        
        
    });

})(jQuery);
