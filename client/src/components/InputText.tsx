type inputProps = {
  placeholder: string;
  onChange: any;
};

export function InputText({ placeholder, onChange }: inputProps) {
  return (
    <input
      className="rounded-xl outline-none p-2"
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
}
