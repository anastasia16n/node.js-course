const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

const args = yargs
  .usage('Usage: node $0 [options]')
  .help('help')
  .alias('help', 'h')
  .version('0.0.1')
  .alias('version', 'v')
  .example('node $0 --entry ./path/ --dist ./path --delete')
  .option('entry', {
    alias: 'e',
    description: 'Указать путь к исходной директории',
    demandOption: true
  })
  .option('dist', {
    alias: 'd',
    describe: 'Куда сортировать?',
    default: './output'
  })
  .option('delete', {
    alias: 'D',
    describe: 'Удалять ли?',
    boolean: true,
    default: false
  })
  .epilog('Моя первая домашка')
  .argv;

const config = {
  entry: path.join(__dirname, args.entry),
  dist: path.join(__dirname, args.dist),
  delete: args.delete
};

function sorter (src) {
  fs.readdir(src, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const currentPath = path.join(src, file);

      fs.stat(currentPath, (err, stat) => {
        if (err) throw err;

        if (stat.isDirectory()) {
          sorter(currentPath);
        } else {
          if (!fs.existsSync('./dist')) {
            fs.mkdir('./dist');
          }
          fs.mkdir('./dist/A', err => {
            if (err) {
              console.log(err);
            }
            fs.link('./src/A/australia.svg', './dist/A/australia.svg', err => {
              if (err) {
                console.error(err.message);
              }
            });
          });
          fs.mkdir('./dist/B', err => {
            if (err) {
              console.log(err);
            }
            fs.link('./src/B/brazil.svg', './dist/B/brazil.svg', err => {
              if (err) {
                console.error(err.message);
              }
            });
          });
          fs.mkdir('./dist/C', err => {
            if (err) {
              console.log(err);
            }
            fs.mkdir('./dist/C/canada', err => {
              if (err) {
                console.log(err);
              }
              fs.mkdir('./dist/C/canada/provinces', err => {
                if (err) {
                  console.log(err);
                }
              });
            });
          });
          fs.link('./src/C/canada/provinces/alberta.svg', './dist/C/canada/provinces/alberta.svg', err => {
            if (err) {
              console.error(err.message);
            }
          });
          fs.link('./src/C/canada/provinces/quebec.svg', './dist/C/canada/provinces/quebec.svg', err => {
            if (err) {
              console.error(err.message);
            }
          });
        }
      });
    });
  });
}

fs.unlink('src/A/australia.svg', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.unlink('src/B/brazil.svg', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.unlink('src/C/canada/provinces/alberta.svg', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.unlink('src/C/canada/provinces/quebec.svg', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.rmdir('src/A', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.rmdir('src/B', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.rmdir('src/C/canada/provinces', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.rmdir('src/C/canada', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.rmdir('src/C', (err) => {
  if (err) {
    console.log(err);
  }
});
fs.rmdir('src', (err) => {
  if (err) {
    console.log(err);
  }
});

try {
  sorter(config.entry);
} catch (error) {
  console.error(error);
}
