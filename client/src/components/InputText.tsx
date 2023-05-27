type inputProps = {
  placeholder: string;
  onChange: any;
  name?: string;
};

export function InputText({ placeholder, onChange, name }: inputProps) {
  return (
    <input
      className="rounded-xl outline-none p-2"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
}
