import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SizeSlider } from "./size-slider";
import { Settings } from "lucide-react";

export const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Settings />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Adjust the game settings below.</DialogDescription>
        </DialogHeader>
        <Label htmlFor="size-slider" className="block mb-2 text-sm font-medium text-gray-700">
          Board Size
        </Label>
        <SizeSlider />
      </DialogContent>
    </Dialog>
  );
};
