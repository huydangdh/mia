import ReactDOM from 'react-dom';
import StepRouter from './routes';
import { Provider } from 'react-redux';
import store from './state/store';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<Provider store={store}><StepRouter/></Provider>);

