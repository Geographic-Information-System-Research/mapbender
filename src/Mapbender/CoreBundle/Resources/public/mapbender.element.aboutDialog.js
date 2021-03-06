(function ($) {
    'use strict';

    $.widget("mapbender.mbAboutDialog", {
        options: {},
        elementUrl: null,
        popup: null,

        _create: function () {
            var self = this,
                $me = $(this.element);

            this.elementUrl = Mapbender.configuration.application.urls.element + '/' + $me.attr('id') + '/';

            $me.on('click', function () {
                self.open();
            });
        },

        defaultAction: function () {
            return this.open();
        },

        open: function () {
            var self = this;

            if (!this.popup || !this.popup.$element) {
                this.popup = new Mapbender.Popup2({
                    title: self.element.attr('title'),
                    modal: true,
                    draggable: false,
                    closeOnOutsideClick: true,
                    content: [ $.ajax({url: self.elementUrl + 'content'})],
                    width: 350,
                    height: 170,
                    buttons: {
                        'ok': {
                            label: 'OK',
                            cssClass: 'button right',
                            callback: function () {
                                self.close();
                            }
                        }
                    }
                });
            } else {
                this.popup.open();
            }
        },

        close: function () {
            if (this.popup && this.popup.$element) {
                this.popup.destroy();
            }
            this.popup = null;
        }
    });

})(jQuery);
