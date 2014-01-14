jquery.cartoon
==============

Cartoons with jquery. Series of animations for different objects.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.cartoon.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

## Usage

Create a scenario:

```javascript
var scenario = {
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
        }
    }
};
```

Play the cartoon:

```javascript
$(dom_element_to_show_a_cartoon).cartoon(scenario);
```

## Example

http://standardocs.com/how-it-works

## Tips

For animation of colors include jquery.color.plugin.

For light-weighted actors use UTF characters.

## Authors

[Andrei Sozonov](https://github.com/whyte624)