import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import "./styles/index.scss";
import { ConfigProvider } from 'antd';
import { token } from './core/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider theme={{
    token,
  }}>
    <App />
  </ConfigProvider>
);

