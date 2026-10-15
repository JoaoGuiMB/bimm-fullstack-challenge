import { Alert, Button, Stack, TextField } from "@mui/material";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CreateCarInput } from "@/features/cars/api/createCar";
import type {
  CreateCarFormValues,
  CreateCarResult,
} from "@/features/cars/types/car";
import { toCreateCarInput } from "@/features/cars/utils/toCreateCarInput";
import { validateCarForm } from "@/features/cars/utils/validateCarForm";
import { Actions, Form } from "./CreateCarForm.styles";

type CreateCarFormProps = {
  submitting: boolean;
  onSubmit: (input: CreateCarInput) => Promise<CreateCarResult>;
  onCancel: () => void;
};

const EMPTY_VALUES: CreateCarFormValues = {
  make: "",
  model: "",
  year: "",
  color: "",
};

const FIELD_ORDER: (keyof CreateCarFormValues)[] = [
  "make",
  "model",
  "year",
  "color",
];

const FAILED_MESSAGE = "Couldn't save the car. Try again.";

export function CreateCarForm({
  submitting,
  onSubmit,
  onCancel,
}: CreateCarFormProps) {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = submitted ? validateCarForm(values) : {};

  function handleChange(field: keyof CreateCarFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setServerError(null);

    const validationErrors = validateCarForm(values);
    const firstInvalid = FIELD_ORDER.find((field) => validationErrors[field]);

    if (firstInvalid) {
      event.currentTarget
        .querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    const result = await onSubmit(toCreateCarInput(values));

    if (result.status === "invalid") setServerError(result.message);
    if (result.status === "failed") setServerError(FAILED_MESSAGE);
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <TextField
          label="Make"
          name="make"
          required
          value={values.make}
          onChange={handleChange("make")}
          error={Boolean(errors.make)}
          helperText={errors.make}
          disabled={submitting}
        />
        <TextField
          label="Model"
          name="model"
          required
          value={values.model}
          onChange={handleChange("model")}
          error={Boolean(errors.model)}
          helperText={errors.model}
          disabled={submitting}
        />
        <TextField
          label="Year"
          name="year"
          required
          value={values.year}
          onChange={handleChange("year")}
          error={Boolean(errors.year)}
          helperText={errors.year}
          disabled={submitting}
          slotProps={{ htmlInput: { inputMode: "numeric" } }}
        />
        <TextField
          label="Color"
          name="color"
          value={values.color}
          onChange={handleChange("color")}
          disabled={submitting}
        />
        <Actions>
          <Button onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" loading={submitting}>
            Save
          </Button>
        </Actions>
      </Stack>
    </Form>
  );
}
