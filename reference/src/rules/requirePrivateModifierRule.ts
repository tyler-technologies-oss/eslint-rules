import { Rules, RuleFailure, RuleWalker, hasModifier, Replacement, IRuleMetadata, Utils } from 'tslint';
import { MethodDeclaration, SourceFile, PropertyDeclaration, SyntaxKind, isMethodDeclaration, isPropertyDeclaration, ClassDeclaration } from 'typescript';

import { getFailureMessage } from '../utils/rule-utils';

export class Rule extends Rules.AbstractRule {
  public static metadata: IRuleMetadata = {
    ruleName: 'require-private-modifier',
    description: 'Requires properties or methods that start with an underscore to be marked with a private modifier.',
    rationale: Utils.dedent`Makes it easy to quickly see that member is private.`,
    optionsDescription: 'Not configurable.',
    options: null,
    optionExamples: [true],
    type: 'style',
    typescriptOnly: false,
  };

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new RequirePrivateModifierWalker(sourceFile, this.getOptions()));
  }
}

class RequirePrivateModifierWalker extends RuleWalker {
  public visitMethodDeclaration(node: MethodDeclaration): void {
    if (this._check(node)) {
      this._setFailure(node, 'Methods');
    }
    super.visitMethodDeclaration(node);
  }

  public visitPropertyDeclaration(node: PropertyDeclaration): void {
    if (this._check(node)) {
      this._setFailure(node, 'Properties');
    }
    super.visitPropertyDeclaration(node);
  }

  private _setFailure(node: MethodDeclaration | PropertyDeclaration, type: string): void  {
    const parentNode = node.parent as ClassDeclaration;
    const nodeInfo = parentNode && parentNode.name && parentNode.name.getText() ? `${parentNode.name.getText()}.${node.name.getText()}` : getFailureMessage(node);
    const failureString = `${type} starting with an underscore must be marked as private: ${nodeInfo}`;
    const nodeStart = node.getStart();
    const nodeWidth = node.name.getStart() - nodeStart;
    const fix = new Replacement(nodeStart, nodeWidth, 'private ');
    this.addFailureAt(nodeStart, nodeWidth, failureString, fix);
  }

  private _check(node: MethodDeclaration | PropertyDeclaration): boolean {
    return node.name && !!node.name.getText() && node.name.getText().startsWith('_') && !hasModifier(node.modifiers, SyntaxKind.PrivateKeyword) && !hasModifier(node.modifiers, SyntaxKind.ProtectedKeyword);
  }
}
