export type FormFieldConfig = {
    name: string;
    label: string;
    type: | "text" | "number" | "date" | "textarea" | "select" | "multiselect" | "checkbox";
    placeholder?: "string"
    options? : { label: string; value: string | number; }[];
    description?: string;
}