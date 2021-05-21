import { Node } from 'typescript';

export function getFailureMessage(node: Node): string {
  const message = node.getText();
  if (message.indexOf('\n') > 0) {
    return message.substr(0, message.indexOf('\n'));
  }
  return message;
}
