import './style.scss';

export interface ICheckbox {
  checked?: boolean;
  onChange?: () => void;
  id?: string;
}

const Checkbox: React.FC<ICheckbox> = ({ checked = false, onChange, id }) => {

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label htmlFor={id}></label>
    </div>
  );
};

export { Checkbox };
