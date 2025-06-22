import { commands, window, languages, ExtensionContext } from "vscode";
import { CustomSidebarViewProvider } from "./customSidebarViewProvider";

export function activate(context: ExtensionContext) {
    const provider = new CustomSidebarViewProvider();

    // Command to open the sidebar
    const openWebView = commands.registerCommand("puzzleGame.openPuzzleGameCommand", async () => {
        await commands.executeCommand("workbench.view.extension.custom-activitybar");
    });

    context.subscriptions.push(openWebView);
    context.subscriptions.push(window.registerWebviewViewProvider(CustomSidebarViewProvider.viewType, provider));

    const diagnosticsListener = languages.onDidChangeDiagnostics(() => {
        provider.updateView();
    });
    context.subscriptions.push(diagnosticsListener);
}

export function deactivate() {}
