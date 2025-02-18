export interface ILinkConfig {
  path: string;
}

export interface ILinkConnection {
  onMessage: (data: Record<string, string>) => void;
}
