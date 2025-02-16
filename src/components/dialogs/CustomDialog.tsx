import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface CustomDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  onConfirm?: () => void;
}

export function CustomDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  onConfirm,
}: CustomDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px] shadow-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          {onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
