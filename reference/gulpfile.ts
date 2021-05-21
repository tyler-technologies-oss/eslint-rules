import { task, src, dest, TaskFunction } from 'gulp';
import { resolve, join } from 'path';
import * as runSequence from 'run-sequence';
import { compileTypeScript, cleanDirectories, copyFilesAsync, lintTypeScript, ITypeScriptCompilerOptions } from '@tylertech/build-tools';

const gulpModifyFile = require('gulp-modify-file');

const ROOT = resolve(__dirname, './');
const OUTPUT_DIR = join(ROOT, 'dist');
const SRC_DIR = join(ROOT, 'src');

(<any>task)('build', ['clean'], (done: TaskFunction) => {
  return runSequence(
    'compile:ts',
    'tslint', // Must come after compile:ts because we reference the rulesDirectory from the dist folder...
    'clean:typings',
    'copy:packageJson',
    'fixup:packageJson',
    done
  );
});

/** Cleans the build output directory. */
task('clean', () => {
  return cleanDirectories(OUTPUT_DIR);
});

/** Cleans all .d.ts files from the build output dist directory. */
task('clean:typings', () => {
  return cleanDirectories(join(OUTPUT_DIR, 'dist/**/*.d.ts'));
});

/** Lints the TypeScript in the project. */
task('tslint', () => {
  return lintTypeScript(join(SRC_DIR, '**/*.ts'), join(ROOT, 'tslint.json'));
});

/** Compiles the TypeScript files in the source directory to the build output directory. */
task('compile:ts', () => {
  return compileTypeScript(join(SRC_DIR, '**/*.ts'), join(ROOT, 'tsconfig.json'));
});

/** Copies the package.json to the build output directory. */
task('copy:packageJson', () => {
  return copyFilesAsync(join(ROOT, 'package.json'), ROOT, OUTPUT_DIR);
});

/** Adjusts the package.json to prepare it for public distribution. */
task('fixup:packageJson', () => {
  return src(join(OUTPUT_DIR, 'package.json'))
    .pipe(gulpModifyFile((content: string, filepath: string, file: Buffer) => {
      const json = JSON.parse(content);
      delete json.devDependencies;
      delete json.scripts;
      return JSON.stringify(json, null, 2);
    }))
    .pipe(dest(OUTPUT_DIR));
});
