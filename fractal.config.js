'use strict';

/*
* Require the path module
*/
// const path = require('path');

/*
 * Require the Fractal module
 */
// const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */

// /*
//  * Tell Fractal where to look for components.
//  */
// fractal.components.set('path', path.join(__dirname, 'components'));

// /*
//  * Tell Fractal where to look for documentation pages.
//  */
// fractal.docs.set('path', path.join(__dirname, 'docs'));

// /*
//  * Tell the Fractal web preview plugin where to look for static assets.
//  */
// fractal.web.set('static.path', path.join(__dirname, 'public'));
// fractal.web.set('builder.dest', __dirname + '/build');

// fractal.components.engine('@frctl/nunjucks'); // use Nunjucks for components
// fractal.docs.engine('@frctl/nunjucks'); // use Nunjucks for docs
// fractal.components.set("ext", ".njk"); // look for files with a .nunj file extension
// fractal.docs.set('ext', '.md');



const fractal = require("@frctl/fractal").create();
const pkg = require("./package.json");

const context = {
  package: {
    name: pkg.name,
    version: pkg.version
  },
  uswds: {
    path: "../../../"
  },
  // eslint-disable-next-line no-script-url
  placeholderLink: "javascript:void()"
};

// fractal.set("project.title", `U.S. Web Design System (v${pkg.version})`);
fractal.set('project.title', 'Metro Component Library Demo');


fractal.set('project.version', 'v1.0');
fractal.set('project.author', 'Metro Digital Design Team');

// fractal.web.set('static.path', __dirname + '/src/css');

/* Specify a directory of static assets */
fractal.web.set('static.path', __dirname + '/dist');


const { components } = fractal;
components.set("ext", ".njk");
components.set("path", "src/components");
components.set("default.preview", "@uswds");
components.set("default.context", context);

// use Nunjucks as the templating engine
components.engine(
  require("@frctl/nunjucks")({
    filters: {
      jsonify: d => JSON.stringify(d, null, "  "),
      dataurl: (d, type) => `data:${type},${encodeURIComponent(d)}`
    },
    paths: ["src/components"]
  })
);

const { web } = fractal;

web.theme(
  require("@frctl/mandelbrot")({
    lang: "en-US",
    skin: "black",
    // display context data in YAML
    format: "yaml",
    // which panels to show
    panels: ["html", "notes", "context", "resources", "info"],
    scripts: [
      "default"
    ]
  })
);

// web.set("static.path", "dist");
// web.set("static.mount", "dist");
// output files to /build
web.set("builder.dest", "build");

module.exports = fractal;