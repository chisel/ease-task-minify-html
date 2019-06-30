const minify = require('html-minifier').minify;
const glob = require('glob');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');

module.exports = (logger, dirname, config) => {

  return () => {

    return new Promise((resolve, reject) => {

      // Validate config
      if ( ! config.dir || ! config.outDir ) return reject(new Error('HTML minifier plugin misconfiguration! dir and outDir must be present.'));

      // Empty outDir if necessary
      if ( config.cleanOutDir ) {

        fs.emptyDirSync(path.join(dirname, config.outDir));

      }

      // Search `config.dir` for `.html` files
      glob('**/*.html', { cwd: path.join(dirname, config.dir) }, (error, files) => {

        if ( error ) return reject(error);

        const promises = [];
        const finalOptions = _.cloneDeep(config);

        delete finalOptions.dir;
        delete finalOptions.outDir;
        delete finalOptions.cleanOutDir;

        logger(`Minifying ${files.length} files...`);

        for ( const file of files ) {

          promises.push(new Promise((resolve, reject) => {

            // Read file
            fs.readFile(path.join(dirname, config.dir, file), { encoding: 'utf8' }, (error, data) => {

              if ( error ) return reject(error);

              // Minify HTML
              const result = minify(data, finalOptions);

              // Write to file
              fs.outputFile(path.join(dirname, config.outDir, file), result, error => {

                if ( error ) return reject(error);

                resolve();

              });

            });

          }));

        }

        Promise.all(promises)
        .then(() => {

          logger(`All ${files.length} files were minified.`);
          resolve();

        })
        .catch(reject);

      });

    });

  };

};
