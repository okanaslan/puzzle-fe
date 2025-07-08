import { ModeSwitch } from "./bottom-bar-components/mode-switch";
import { SettingsDialog } from "./settings-components/settings-dialog";

export const BottomBar = () => {
  return (
    <div className="relative flex flex-col items-center pt-4 w-full">
      <ModeSwitch />
      <div className="absolute right-4">
        <SettingsDialog />
      </div>
    </div>
  );
};
