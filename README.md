# OpenGraphParser

Extract the first url from the provided string if any, fetch the related html page content & parse it to return an opengraph data object

    {
        url: 'https://github.com/mem0master/openGraphParser'
        title: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: 'https://github.com/mem0master/openGraphParser/some_image',
    }

## Example

```javascript

OpenGraphParser.extractMeta(textContainingUrl).then(
    (response) => {
        if (response) {
            // process
        }
    }
);

```


## Todo

*   Generate ES5 compliant code
*   Add Test cases
