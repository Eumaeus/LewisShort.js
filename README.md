# LewisShort.js

![version 1.0.0](https://img.shields.io/badge/LewisShort.js-1.0.0-orange)

A Javascript-only implementation of the *Lewis & Short Latin Dictionary*.

This is an implementation of a web-application for consulting [*A Latin Dictionary.* Founded on Andrews’ edition of Freund's Latin dictionary, revised, enlarged, and in great part rewritten by Charlton T. Lewis, Ph.D., and Charles Short, LL.D. (Oxford: Clarendon Press, 1879).](https://en.wikipedia.org/wiki/A_Latin_Dictionary). It is written in entirely in Javascript, with as few external dependencies as possible, for longevity and stablity. [Julia](https://julialang.org) with the [Dash framework](https://dash.plotly.com/julia/introduction). It is the successor to two earlier versions: [one](https://github.com/Eumaeus/Lewis_and_Short.jl) written in [Julia]((https://julialang.org) with the [Dash]((https://julialang.org) framework, and [one](http://folio2.furman.edu/lewis-short/index.html), written in [ScalaJS](https://www.scala-js.org). (See, [this blog post about that earlier version, and the data behind it](https://eumaeus.github.io/2018/10/30/lsj.html))

## Why This Rewrite?

I wanted a lexicon that depended as little as possible on fragile build-systems with innumerable dependencies. Both the Julia and Scala versions were laborious to update and keep online. This application uses [jQuery](https://jquery.com) and [Marked.js](https://marked.js.org), which can be hosted locally.

This version can be run entirely offline from a personal machine.

## Running *LewisShort.js* on Your Machine

1. Clone this repository. 
1. Put it somewhere, *e.g.* `/Users/your_user_name/Desktop/LewisShort.js`.
1. You *might* be able to run it by double-clicking on `index.html`. But your browser probably has security measures in place to prevent this.
1. So you need to "serve" the files by running a little local web-server.
	- You can try [SimpleWebServer](https://simplewebserver.org). Follow the instructions to have it load `…/LewisShort.js/index.html` by default.
	- If you have Python installed, you can [use it to run a simple server.](https://pythonbasics.org/webserver/).
	- Either way, start the server and aim your browser at the address you were given. It will be something like `localhost:8081/`.

There is a Help File linked from the application, once you get it running.

## The Data

[I describe the work to transform the *Lewis & Short* data from openly licensed sources here.](https://eumaeus.github.io/2018/10/30/lsj.html) There is a link in the application for downloading the raw lexicon file, `lexicon.cex`. This is a self-describing data-collection in the form of a single plain-text file, based on the [CITE Architecture](https://github.com/cite-architecture). That files is in the `/data/` directory of this Git archive.

## Acknowledgements

Thanks to the [Perseus Digital Library](http://www.perseus.tufts.edu/hopper/) and Gregory Crane, Helma Dik, and Giuseppe Celano for creating and publishing the data. All of the concepts behing this application are the result of a long and fruitful collaboration with [Neel Smith](http://neelsmith.github.io).