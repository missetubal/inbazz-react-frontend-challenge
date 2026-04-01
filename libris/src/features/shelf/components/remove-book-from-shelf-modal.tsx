import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import type { TFunction } from 'i18next';

interface RemoveBookFromShelfModalProps {
  isRemoveConfirmModalOpen: boolean;
  closeRemoveConfirmModal: () => void;
  handleConfirmRemoveBook: () => void;
  bookToRemoveTitle: string | null;
  t: TFunction<string, undefined>;
}
export const RemoveBookFromShelfModal = ({
  bookToRemoveTitle,
  closeRemoveConfirmModal,
  handleConfirmRemoveBook,
  isRemoveConfirmModalOpen,
  t,
}: RemoveBookFromShelfModalProps) => {
  return (
    <Dialog
      open={isRemoveConfirmModalOpen}
      onOpenChange={closeRemoveConfirmModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('shelf.removeConfirmModal.title')}</DialogTitle>
          <DialogDescription>
            {t('shelf.removeConfirmModal.description', {
              bookTitle: bookToRemoveTitle,
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={closeRemoveConfirmModal}>
            {t('shelf.removeConfirmModal.cancel')}
          </Button>
          <Button variant='destructive' onClick={handleConfirmRemoveBook}>
            {t('shelf.removeConfirmModal.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
