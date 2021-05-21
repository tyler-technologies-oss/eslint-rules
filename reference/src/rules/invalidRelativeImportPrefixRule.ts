import { Rules, RuleWalker, RuleFailure, Utils, IRuleMetadata, Replacement } from 'tslint';
import { SourceFile, ImportDeclaration } from 'typescript';

export class Rule extends Rules.AbstractRule {
  public static metadata: IRuleMetadata = {
    ruleName: 'invalid-relative-import-prefix',
    description: 'Avoids inconsistent import paths.',
    rationale: Utils.dedent`Makes relative imports consistent across modules.`,
    optionsDescription: 'Not configurable.',
    options: null,
    optionExamples: [true],
    type: 'style',
    typescriptOnly: false,
  };

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new InvalidRelativeImportPrefixWalker(sourceFile, this.getOptions()));
  }
}

class InvalidRelativeImportPrefixWalker extends RuleWalker {
  public visitImportDeclaration(node: ImportDeclaration): void {
    if (this._check(node)) {
      const failureString = `Relative import statements cannot start with "./../": ${node.moduleSpecifier.getText()}`;
      const errorStart = node.moduleSpecifier.getStart() + 1;
      const fix = new Replacement(errorStart, 5, '../');
      this.addFailureAt(errorStart, 5, failureString, fix);
    }
    super.visitImportDeclaration(node);
  }

  private _check(node: ImportDeclaration): boolean {
    if (!node || !node.moduleSpecifier) {
      return false;
    }
    const path = node.moduleSpecifier.getText();
    return !!path && /^['"]\.\/\.\.\/(.*)/.test(path);
  }
}
