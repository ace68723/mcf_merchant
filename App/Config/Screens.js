import { Navigation } from 'react-native-navigation';

import CreateQRCode from '../Components/CreateQRCode';
import EnterAmount from '../Components/EnterAmount';
import EnterRefoundNumber from '../Components/EnterRefoundNumber';
import Home from '../Components/Home';
import Loading from '../Components/Loading';
import Login from '../Components/Login';
import OrderReceipt from '../Components/OrderReceipt';
import Pay from '../Components/Pay';
import Refound from '../Components/Refound';
import RefoundReceipt from '../Components/RefoundReceipt';
import ScanQRCode from '../Components/ScanQRCode';
import ScanRefoundQRCode from '../Components/ScanRefoundQRCode';
import SelectChannel from '../Components/SelectChannel';
import SelectRefound from '../Components/SelectRefound';
import Transaction from '../Components/Transaction';
import Alert from '../Components/Alert';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('CreateQRCode', () => CreateQRCode);
  Navigation.registerComponent('EnterAmount', () => EnterAmount);
  Navigation.registerComponent('EnterRefoundNumber', () => EnterRefoundNumber);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Loading', () => Loading);
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('OrderReceipt', () => OrderReceipt);
  Navigation.registerComponent('Pay', () => Pay);
  Navigation.registerComponent('Refound', () => Refound);
  Navigation.registerComponent('RefoundReceipt', () => RefoundReceipt);
  Navigation.registerComponent('ScanQRCode', () => ScanQRCode);
  Navigation.registerComponent('ScanRefoundQRCode', () => ScanRefoundQRCode);
  Navigation.registerComponent('SelectChannel', () => SelectChannel);
  Navigation.registerComponent('SelectRefound', () => SelectRefound);
  Navigation.registerComponent('Transaction', () => Transaction);
  Navigation.registerComponent('Alert', () => Alert);

}
