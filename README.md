# React Chess 2 &middot; [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.md) [![Netlify Status](https://api.netlify.com/api/v1/badges/622d7c96-5d7f-4342-b627-9c18f2166f45/deploy-status)](https://app.netlify.com/sites/react-chess-065995/deploys)

Programs must be written for people to read, and only incidentally for machines to execute.

- Abelson & Sussman, Structure and Interpretation of Computer Programs

## Milestones

https://github.com/HajraRafiq/react-chess

#Dockerhub image
https://hub.docker.com/r/hajrarafiq/chess

## Showcase

https://react-chess.app

## Installation & Development Start

```bash
npm install
npm start
```

open browser, http://localhost:3000

## License

MIT
## For making container
```bash
nerdctl build -t chess:v1 .
```

#For running the container in localhost

```bash
 nerdctl run -p 8000:80 chess:v1
```

#To pull my container image

```bash 
nerdctl pull hajrarafiq/chess:v1
```
#To run my chess image

```bash
nerdctl run hajrarafiq/chess:v1
```

# To check files inside the container

```bash
nerdctl run -it hajrarafiq/chess:v1
```


