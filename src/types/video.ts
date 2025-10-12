// 视频项接口
export interface VideoItem {
  name: string;
  url: string;
}

// 按类别分组的视频接口
export interface CategorizedVideo {
  category: string;
  videos: VideoItem[];
}

// 原有的Video接口（可保留用于兼容）
export interface Video {
  category: string;
  name: string;
  url: string;
}

// 视频请求接口
export interface Videorequest {
  category: string;
  name: string;
  video: File;
}
