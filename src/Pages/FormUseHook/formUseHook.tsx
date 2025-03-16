import './style.scss';
import { FormUseHook } from '../../Components/Form/formUseHook';

export function FormUseHookPage() {
  return (
    <div className="logIn-wrapper">
      <h3 className="title">
        <i>Welcome. Please make the form.</i>
      </h3>
      <FormUseHook />
    </div>
  );
}
