// copy-paste from https://stackoverflow.com/questions/14084406/typescript-and-socket-io

declare var io : {
  connect(url: string): Socket;
};
interface Socket {
  on(event: string, callback: (data: any) => void ): Socket;
  emit(event: string, data: any): Socket;
}

