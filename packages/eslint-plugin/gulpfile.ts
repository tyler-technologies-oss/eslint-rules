// import { gulp.task } from 'gulp';
// import { resolve, join } from 'path';
// import fs from 'fs';
// import ncp from 'ncp'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ncp = require('ncp');
// const fs = require('fs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gulp = require('gulp');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');


const ROOT = path.resolve(__dirname, './');
const OUTPUT_DIR = path.join(ROOT, 'publish');
const PACKAGE_DIST = path.join(ROOT, 'dist');
const PACKAGE_DIST_PUBLISH = path.join(OUTPUT_DIR, 'dist');

gulp.task('publish', async (done: () => void) => {
    const copyBuildToPublishFolder = new Promise(resolve => {
        ncp(PACKAGE_DIST, PACKAGE_DIST_PUBLISH, () => {
            resolve(true);
        });
    });

    const copyPackageJson = new Promise(resolve => {
        ncp(path.join(ROOT, 'package.json'), path.join(OUTPUT_DIR, 'package.json'), () => {
            resolve(true);
        });
    });

    const createPublishFolder = new Promise(resolve => {
        fs.mkdir(OUTPUT_DIR, { recursive: true }, () => {
            resolve(true);
        });
    });

    const createPublishDistFolder = new Promise(resolve => {
        fs.mkdir(PACKAGE_DIST_PUBLISH, () => {
            resolve(true);
        });
    });

    const copyTypings = new Promise(resolve => {
        ncp(path.join(ROOT, 'typings'), path.join(OUTPUT_DIR, 'typings'), () => {
            resolve(true)
        });
    });

    await createPublishFolder;
    await copyBuildToPublishFolder;
    await createPublishDistFolder;
    await copyPackageJson;
    await copyTypings;

    done();
});
