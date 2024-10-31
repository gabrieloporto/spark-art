import { MutableRefObject } from "react";

export interface AppForm {
  prompt: string;
  handleGenerateImage: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
  onChangePrompt: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export interface GeneratedSparkImage {
  imageUrl: string;
}

export interface AppHeader {
  imageUrl: string;
  loading: boolean;
  onDownloadImage: () => void;
}

export interface DownloadSparkImage {
  imageUrl: string;
  promptRef: MutableRefObject<string>;
}
