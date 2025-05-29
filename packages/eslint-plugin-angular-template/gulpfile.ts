import { task } from 'gulp';
import { resolve, join, dirname } from 'path';
import fs from 'fs';
import ncp from 'ncp'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '../../');
const ROOT = resolve(__dirname, './');
const OUTPUT_DIR = join(ROOT, 'publish');
const PACKAGE_DIST = join(ROOT, 'dist');
const PACKAGE_DIST_PUBLISH = join(OUTPUT_DIR, 'dist');

task('publish', async done => {
    const copyBuildToPublishFolder = new Promise(resolve => {
        ncp(PACKAGE_DIST, PACKAGE_DIST_PUBLISH, () => {
            resolve(true);
        });
    });

    const copyPackageJson = new Promise(resolve => {
        ncp(join(ROOT, 'package.json'), join(OUTPUT_DIR, 'package.json'), () => {
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
        ncp(join(ROOT, 'typings'), join(OUTPUT_DIR, 'typings'), () => {
            resolve(true)
        });
    });

    const copyLicense = new Promise(resolve => {
        ncp(join(REPO_ROOT, 'LICENSE'), join(OUTPUT_DIR, 'LICENSE'), () => {
            resolve(true)
        });
    });

    await createPublishFolder;
    await copyBuildToPublishFolder;
    await createPublishDistFolder;
    await copyPackageJson;
    await copyTypings;
    await copyLicense;

    done();
});
