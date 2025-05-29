import fs from 'fs';
import ncp from 'ncp';
import gulp from 'gulp';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../../');
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
      resolve(true);
    });
  });

  const copyLicense = new Promise(resolve => {
    ncp(path.join(REPO_ROOT, 'LICENSE'), path.join(OUTPUT_DIR, 'LICENSE'), () => {
      resolve(true);
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
