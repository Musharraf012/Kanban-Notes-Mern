import React from "react";
import Card from "./Card";
import Button from "./Button";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // "danger", "warning", "info"
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z",
          iconColor: "text-red-500",
          confirmButton: "bg-red-500 hover:bg-red-600 text-white",
        };
      case "warning":
        return {
          icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z",
          iconColor: "text-yellow-500",
          confirmButton: "bg-yellow-500 hover:bg-yellow-600 text-white",
        };
      default:
        return {
          icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          iconColor: "text-blue-500",
          confirmButton: "bg-blue-500 hover:bg-blue-600 text-white",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <Card className="relative">
            {/* Icon and Title */}
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${styles.iconColor}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={styles.icon}
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-600 mb-6">{message}</p>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={onClose}>
                {cancelText}
              </Button>
              <Button onClick={onConfirm} className={styles.confirmButton}>
                {confirmText}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
