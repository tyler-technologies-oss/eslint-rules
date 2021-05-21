import { Rules, RuleFailure, RuleWalker, hasModifier, Replacement, IRuleMetadata, Utils } from 'tslint';
import { MethodDeclaration, SourceFile, PropertyDeclaration, SyntaxKind, isMethodDeclaration, isPropertyDeclaration, Declaration, ClassDeclaration } from 'typescript';

import { getFailureMessage } from '../utils/rule-utils';

export class Rule extends Rules.AbstractRule {
  public static metadata: IRuleMetadata = {
    ruleName: 'require-private-underscore',
    description: 'Requires the use of an underscore on all private properties and methods.',
    rationale: Utils.dedent`Keeps the user of private members consistent.`,
    optionsDescription: 'Not configurable.',
    options: null,
    optionExamples: [true],
    type: 'style',
    typescriptOnly: false,
  };

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new RequirePrivateUnderscoreWalker(sourceFile, this.getOptions()));
  }
}

class RequirePrivateUnderscoreWalker extends RuleWalker {
  public visitMethodDeclaration(node: MethodDeclaration): void {
    if (this._check(node)) {
      this._setFailure(node, 'methods');
    }
    super.visitMethodDeclaration(node);
  }

  public visitPropertyDeclaration(node: PropertyDeclaration): void {
    if (this._check(node)) {
      this._setFailure(node, 'properties');
    }
    super.visitPropertyDeclaration(node);
  }

  private _setFailure(node: MethodDeclaration | PropertyDeclaration, type: string): void {
    const parentNode = node.parent as ClassDeclaration;
    const nodeInfo = parentNode && parentNode.name && parentNode.name.getText() ? `${parentNode.name.getText()}.${node.name.getText()}` : getFailureMessage(node);
    const failureString = `Private ${type} must start with an underscore: ${nodeInfo}`;
    const nodeNameStartPos = node.name.getStart();
    const nodeNameWidth = node.name.getWidth();
    const fix = new Replacement(nodeNameStartPos, nodeNameWidth, `_${node.name.getText()}`);
    this.addFailureAt(nodeNameStartPos, nodeNameWidth, failureString, fix);
  }

  private _check(node: MethodDeclaration | PropertyDeclaration): boolean {
    return !!node.name && !!node.name.getText() && hasModifier(node.modifiers, SyntaxKind.PrivateKeyword) && !node.name.getText().startsWith('_');
  }
}
