import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { CreateCarInput } from "@/features/cars/api/createCar";
import { CreateCarForm } from "@/features/cars/components/CreateCarForm";
import { useCreateCar } from "@/features/cars/hooks/useCreateCar";

type CreateCarDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateCarDialog({ open, onClose }: CreateCarDialogProps) {
  const { createCar, creating } = useCreateCar();

  async function handleSubmit(input: CreateCarInput) {
    const result = await createCar(input);

    if (result.status === "created") onClose();

    return result;
  }

  return (
    <Dialog
      open={open}
      onClose={creating ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add a car</DialogTitle>
      <DialogContent>
        <CreateCarForm
          submitting={creating}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
