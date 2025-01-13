import { ConfirmStyled } from './styled';
interface Props {
  title?: string;
  onCancel?: () => void;
  onOk?: () => void;
  okText?: string;
  body?: string;
  open?: boolean;
}
const Confirm = ({ title, onCancel, onOk, okText, body, open }: Props) => {
  return (
    <ConfirmStyled
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}>
      {body}
    </ConfirmStyled>
  );
};

export default Confirm;
