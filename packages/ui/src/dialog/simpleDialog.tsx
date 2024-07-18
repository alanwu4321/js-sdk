import { FC, PropsWithChildren, ReactNode } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { Divider } from "../divider";
import {
  SimpleDialogFooter,
  SimpleDialogFooterProps,
} from "./simpleDialogFooter";

type SimpleDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg";
  closable?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  contentClassName?: string;
  footerClassName?: string;
  // footer?: ReactNode;
} & SimpleDialogFooterProps;

/**
 * Simplified dialog component.
 */
const SimpleDialog: FC<PropsWithChildren<SimpleDialogProps>> = (props) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        size={props.size}
        closable={props.closable}
        onOpenAutoFocus={(event) => event.preventDefault()}
        className={props.contentClassName}
      >
        {props.title && (
          <>
            <DialogHeader>
              <DialogTitle>{props.title}</DialogTitle>
            </DialogHeader>
            <Divider />
          </>
        )}
        <DialogBody>{props.children}</DialogBody>
        {typeof props.description !== "undefined" && (
          <DialogDescription>{props.description}</DialogDescription>
        )}
        <SimpleDialogFooter actions={props.actions} className={props.footerClassName} />
      </DialogContent>
    </Dialog>
  );
};

export { SimpleDialog };

export type { SimpleDialogProps };
