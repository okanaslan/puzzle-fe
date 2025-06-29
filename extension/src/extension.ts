import { commands, window, languages, ExtensionContext } from "vscode";
import { CustomSidebarViewProvider } from "./customSidebarViewProvider";

export function activate(context: ExtensionContext) {
    const provider = new CustomSidebarViewProvider();

    context.subscriptions.push(
        // Command to open the sidebar
        commands.registerCommand("puzzleGame.openGame", async () => {
            await commands.executeCommand("workbench.view.extension.custom-activitybar");
        }),
        
        // Register webview provider
        window.registerWebviewViewProvider(CustomSidebarViewProvider.viewType, provider),
        
        // Listen for diagnostics changes
        languages.onDidChangeDiagnostics(() => provider.updateView())
    );
}

export function deactivate() {}
