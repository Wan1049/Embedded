export interface SensorData {
  time: string;
  flame: number;
  light: number;
  vibration: number;
  temp: number;
  obs: number;
  cameraImage: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    deviceid: string;
    data: {
      buzzer: boolean;
      time: string;
      flame: number;
      light: number;
      vibration: number;
      temp: number;
      obs: number;
      node2: object;
      cameraImage: string;
    };
    rev: number;
    timestamp: number;
    modified: number;
  };
}
