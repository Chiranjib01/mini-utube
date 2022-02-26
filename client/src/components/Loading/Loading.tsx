import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './loading.css';

const Loading = ({ height = '30px', width = '30px' }) => {
  return (
    <div>
      <AiOutlineLoading3Quarters
        className="circularLoader"
        style={{ height, width }}
      />
    </div>
  );
};

export default Loading;
