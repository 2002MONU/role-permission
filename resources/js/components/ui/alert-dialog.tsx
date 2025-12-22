import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default"
}) => {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {description}
          </p>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="cursor-pointer"
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
            className="cursor-pointer"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ConfirmDialog }

// Export all the components that were in the original file
export const AlertDialog = {
  Root: ({ children }: { children: React.ReactNode }) => children,
  Trigger: ({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) => children,
  Portal: ({ children }: { children: React.ReactNode }) => children,
  Overlay: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("fixed inset-0 bg-black/50", className)} {...props} />
  ),
  Content: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("fixed inset-0 flex items-center justify-center p-4", className)} {...props} />
  ),
  Header: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("text-center sm:text-left", className)} {...props} />
  ),
  Footer: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex justify-end gap-2", className)} {...props} />
  ),
  Title: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-lg font-semibold", className)} {...props} />
  ),
  Description: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-sm text-gray-600", className)} {...props} />
  ),
  Action: ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <Button className={className} {...props} />
  ),
  Cancel: ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <Button variant="outline" className={className} {...props} />
  ),
}
