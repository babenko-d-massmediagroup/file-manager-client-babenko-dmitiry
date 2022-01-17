export interface Info {
  _id: string;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  filename: string;
  contentType: string;
  metadata: {
    userId: string;
    fileInfo: string;
  };
}

export interface Statistic {
  deleteFiles: number;
  fileCount: number;
  linkWatchedTimes: number;
  tempLinkCount: number;
  usedTemporaryLinks: number;
}
