# gis-app

This is a basic sample app showing the use of `react-mapbox-gl` in a React app.

## TL;DR

To run:

First setup a free account at mapbox.com.
Add the correct `.env` variables in `.env.template`. Renaming the file is OK.

To run with the API you will need: `REACT_APP_API_HOST=http://localhost:3001` where `3001` is the port of your API on the same host.


```shell
# Install the required Node modules
npm i
# Run the application
npm run build && npm run start
```

The App should run on it's own but with limited features. There is a companion API, to find out more read on.

## Overview

This App was created with the `create-react-app` generic starter template. The original README has been renamed to [CRA-README.md](/CRA-README.md).

The App has a BFF style API which is either in the same project as this or on it's own. I prefer 12 factor style apps so I've split up the API from the App.

## Links:

- [docs.mapbox.com](https://docs.mapbox.com/)
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)
- [react-mapbox-gl/demos](https://alex3165.github.io/react-mapbox-gl/demos)
