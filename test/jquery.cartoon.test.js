TestCase("jquery.cartoon.test", {
    scenario: {
        actors: {
            smile: {
                html: '<div>&#9786;</div>',
                css: { position: 'absolute', display: 'block', top: '25%', left: '30%', fontSize: '18em' },
                actions: [
                    { when: 0, what: { css: {fontSize: '18em'} } },
                    { when: 2000, what: { css: {fontSize: '6em', left: '10%'} } },
                    { when: 3000, what: 'wait' },
                    { when: 5000, what: { css: {opacity: 0} } },
                    { when: 6000, what: { css: {opacity: 1, left: '50%', top: '10%'} }, during: 2000 }
                ]
            },
            frown: {
                html: '<div>&#9787;</div>',
                css: { position: 'absolute', top: '75%', left: '70%', fontSize: '6em' },
                actions: [
                    { when: 0, what: 'wait' },
                    { when: 1000, what: { css: {left: '10%'} } },
                    { when: 3000, what: { css: {left: '90%'} } },
                    { when: 6000, what: { css: {left: '40%', top: '10%'} }, during: 2000 }
                ]
            },
            banner: {
                html: '<div></div>',
                css: { position: 'absolute', display: 'block', textAlign: 'center', width: '100%', fontSize: '1.3em', opacity: '1' },
                actions: [
                    { when: 0, what: { content: 'Example of usage' } },
                    { when: 3000, what: { content: 'jquery.cartoon' } }
                ]
            },
            invisible: {
                html: '<div>&#9788;</div>',
                css: { position: 'absolute', display: 'none', top: '25%', left: '30%', fontSize: '18em' },
                actions: [
                    { when: 0, what: { css: {fontSize: '18em'} } },
                    { when: 0, what: { css: {fontSize: '6em', left: '10%'} } }
                ]
            }
        }
    },
    "test duration calculation": function() {
        assertEquals(1000, $('<div></div>').cartoon('_getDuration', this.scenario.actors.smile.actions, 3));
        assertEquals(2000, $('<div></div>').cartoon('_getDuration', this.scenario.actors.smile.actions, 4));
    },
    "test adding actors": function() {
        var $el = $('<div></div>').cartoon('_addActor', '<div/>', 0, this.scenario.actors.smile);
        assertEquals('18em', $el.css('fontSize'));
    },
    "test playing actors": function() {
        var $el = $('<div></div>').cartoon('_addActor', '<div/>', 0, this.scenario.actors.invisible);
        assertEquals('10%', $el.css('left'));
    }
});