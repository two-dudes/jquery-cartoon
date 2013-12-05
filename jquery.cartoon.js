/*!
 * jQuery Cartoon v@VERSION
 * https://github.com/whyte624/jquery-cartoon
 *
 * Copyright 2013 Andrey Sozonov aka whyte624
 * Released under the MIT license.
 * http://standardocs.com/
 *
 * Date: @DATE
 */
(function($) {
    var actorsPrefix = 'ca-';

    var action = function(stage, scenario) {
        if (typeof(scenario.actors) != 'undefined') {
            $.each(scenario.actors, function(index, actorData) {
                if (typeof(actorData.html) != 'undefined') {
                    var actor = $('<div/>').html(actorData.html).contents();
                    actor.attr('id', actorsPrefix + index);
                    if (typeof(actorData.css) != 'undefined') {
                        actor.css(actorData.css);
                    }

                    $(stage).append(actor);

                    if (typeof(actorData.actions) != 'undefined') {
                        play(actor, actorData.actions);
                    }
                }
            });
        }
    };

    var play = function(actor, actions, index) {
        if(typeof(index) == 'undefined') {
            index = 0;
        }

        if (actions[index]) {
            var duration = getDuration(actions, index);
            if (typeof(actions[index].what) == 'string') {
                switch (actions[index].what) {
                    case 'wait':
                        setTimeout(play, duration, actor, actions, index + 1);
//                        console.log('wait');
                        break;
                }
            } else {
//                console.log('animate', actions[index].what.css);
                if (typeof(actions[index].what.css) != 'undefined') {
                    $(actor).animate(actions[index].what.css, duration, function() {
                        play(actor, actions, index + 1);
                    });
                }
                if (typeof(actions[index].what.content) != 'undefined') {
                    $(actor).animate({opacity: 0}, 500, function() {
                        $(actor).html(actions[index].what.content);
                        $(actor).animate({opacity: 1}, 500);
                    });
                    setTimeout(play, duration, actor, actions, index + 1);
                }
            }
        }
    };

    var getDuration = function(actions, index) {
        if (actions[index].during != undefined) {
            return actions[index].during;
        } else if (actions[index + 1] != undefined) {
            return actions[index + 1].when - actions[index].when;
        } else {
            return 0;
        }
    };

    var methods = {
        init : function(options) {

            return this.each(function() {
                var $this = $(this);
                var settings = $this.data('cartoon');

                if(typeof(settings) == 'undefined') {

                    var defaults = {
                        scenario: {}
                    };

                    settings = $.extend({}, defaults, options);
                    $this.data('cartoon', settings);
                } else {
                    settings = $.extend({}, settings, options);
                }
                action($(this), settings['scenario']);
            });
        },
        destroy: function(options) {
            return $(this).each(function() {
                var $this = $(this);

                $this.removeData('cartoon');
            });
        }
    };

    $.fn.cartoon = function() {
        var method = arguments[0];

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' +  method + ' doesn\'t exist for jQuery.cartoon');
        }
    };
})(jQuery);