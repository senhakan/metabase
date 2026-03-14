import { useEffect } from "react";

interface UpgradeModalProps {
  opened: boolean;
  onClose: () => void;
}

export function UpgradeModal({ opened, onClose }: UpgradeModalProps) {
  useEffect(() => {
    if (opened) {
      onClose();
    }
  }, [opened, onClose]);

  return null;
}
