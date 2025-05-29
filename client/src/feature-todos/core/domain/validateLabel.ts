import { ValidatedLabel } from "../types";

export const validateLabel = (raw: string): ValidatedLabel => {
    const label = String(raw);
    return label.slice(0, 60);
};
