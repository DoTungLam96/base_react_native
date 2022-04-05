
const REQUEST_TIMEOUT = 10 * 1000;
interface GlobalData {
  sessionId: string;
  sessionLogin: string;
  isConnected: boolean;

}
const globalData: GlobalData = {
  sessionId: '',
  sessionLogin: '',
  isConnected: true,
};




// TODO: change later

export { globalData, REQUEST_TIMEOUT };

