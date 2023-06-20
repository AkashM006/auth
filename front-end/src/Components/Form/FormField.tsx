import { FormikProps } from "formik";

type Props<T> = {
  fieldName: keyof T;
  isLoading: boolean;
  formik: FormikProps<T>;
  type: string;
};

function FormField<T>({ fieldName, isLoading, formik, type }: Props<T>) {
  const hasError = formik.touched[fieldName] && formik.errors[fieldName];

  const fieldText = fieldName as string;

  return (
    <div className="form-group my-3">
      <label className="mb-2 text-capitalize" htmlFor={fieldText}>
        {fieldText}:{" "}
      </label>
      <input
        type={type}
        className={`form-control ${hasError && "is-invalid"}`}
        {...formik.getFieldProps(fieldText)}
        disabled={isLoading}
        placeholder={fieldText.charAt(0).toUpperCase() + fieldText.slice(1)}
        id={fieldText}
      />
      {hasError && (
        <p className="invalid-feedback">{formik.errors[fieldName] as string}</p>
      )}
    </div>
  );
}

export default FormField;
