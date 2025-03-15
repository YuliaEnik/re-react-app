import './style.scss';
import { Form } from '../../Components/Form/form';

export function FormPage() {
  return (
    <div className="logIn-wrapper">
      <h3 className="title">
        <i>Welcome. Please make the form.</i>
      </h3>
      <Form />
    </div>
  );
}
