export interface SelectStyles {
  control: (
    baseStyles: Record<string, any>,
    state: Record<string, any>
  ) => Record<string, any>;
  input: (baseStyles: Record<string, any>) => Record<string, any>;
  singleValue: (baseStyles: Record<string, any>) => Record<string, any>;
  multiValue: (baseStyles: Record<string, any>) => Record<string, any>;
  multiValueLabel: (baseStyles: Record<string, any>) => Record<string, any>;
  multiValueRemove: (baseStyles: Record<string, any>) => Record<string, any>;
  menuList: (baseStyles: Record<string, any>) => Record<string, any>;
  option: (
    baseStyles: Record<string, any>,
    state: Record<string, any>
  ) => Record<string, any>;
  placeholder: (baseStyles: Record<string, any>) => Record<string, any>;
  indicatorSeparator: (baseStyles: Record<string, any>) => Record<string, any>;
  menuPortal: (baseStyles: Record<string, any>) => Record<string, any>;
}

export const selectStyles: SelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused
      ? "var(--darkest-terror)"
      : "var(--dark-terror)",
    borderColor: state.isFocused ? "var(--dark-terror)" : "var(--light-terror)",
    color: "var(--lightest-terror)",
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: "var(--lightest-terror)",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    fontWeight: 400,
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "var(--primary)",
    borderColor: "var(--primary-dark)",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    fontWeight: 600,
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    "&:hover": {
      backgroundColor: "var(--primary-dark)",
      borderColor: "var(--primary-dark)",
      color: "var(--create-light)",
    },
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "var(--darker-terror)",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused
      ? "var(--light-terror)"
      : "var(--darker-terror)",
    color: "var(--offwhite)",
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: "var(--lightest-terror)",
    fontWeight: 400,
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "var(--dark-terror)",
  }),
  menuPortal: (baseStyles) => ({ ...baseStyles, zIndex: 9999 }),
};
