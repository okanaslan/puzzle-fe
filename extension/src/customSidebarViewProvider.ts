import { WebviewViewProvider, WebviewView } from "vscode";

export class CustomSidebarViewProvider implements WebviewViewProvider {
    public static readonly viewType = "puzzleGame.openview";
    private _view?: WebviewView;

    resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
        this._view = webviewView;
        webviewView.webview.options = { enableScripts: true, localResourceRoots: [] };
        this._updateView();
    }

    private _updateView() {
        if (this._view) {
            this._view.webview.html = this.getHtmlContent();
        }
    }

    private getHtmlContent(): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <iframe src="https://unpkg.com/puzzle-game" stylce="width: 100%; height: 100vh; border: none"></iframe>
            </body>
        </html>`;
    }

    public updateView() {
        this._updateView();
    }
}
