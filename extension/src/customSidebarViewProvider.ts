import { WebviewViewProvider, WebviewView } from "vscode";

export class CustomSidebarViewProvider implements WebviewViewProvider {
  public static readonly viewType = "puzzleGame.openview";
  private _view?: WebviewView;

  resolveWebviewView(webviewView: WebviewView): void {
    this._view = webviewView;
    webviewView.webview.options = { enableScripts: true, localResourceRoots: [] };
    this.updateView();
  }

  public updateView() {
    if (this._view) {
      this._view.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <iframe src="https://unpkg.com/puzzle-game" style="width: 100%; height: 100vh; border: none"></iframe>
            </body>
        </html>`;
    }
  }
}
