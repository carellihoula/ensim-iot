"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

interface CustomDialogProps {
  isOpen: boolean;
  showFooter?: boolean;
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
  showFooter,
}: CustomDialogProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px] shadow-lg w-[85%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center underline">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              <div>
                {isExpanded ? description : `${description.slice(0, 100)}...`}
                {description && description.length > 100 && (
                  <Button
                    variant="link"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm"
                  >
                    {isExpanded ? "Voir moins" : "Voir plus"}
                  </Button>
                )}
              </div>
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-4">{children}</div>
        {showFooter && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            {onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
