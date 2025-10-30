import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Order } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export function ReceiptModal({ isOpen, onClose, order }: ReceiptModalProps) {
  if (!order || !order.id) return null;

  const orderDate = new Date(order.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-receipt">
        <div className="text-center space-y-6 py-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground">
              Thank you for your purchase, {order.customerName}
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6 space-y-3 text-left">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono text-xs" data-testid="text-order-id">
                  {order.id.substring(0, 8)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span data-testid="text-order-date">{orderDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="truncate ml-4" data-testid="text-order-email">
                  {order.customerEmail}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Paid</span>
              <span className="text-2xl font-bold tabular-nums" data-testid="text-order-total">
                ${parseFloat(order.total).toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to {order.customerEmail}
          </p>

          <Button
            size="lg"
            className="w-full"
            onClick={onClose}
            data-testid="button-continue-shopping"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
