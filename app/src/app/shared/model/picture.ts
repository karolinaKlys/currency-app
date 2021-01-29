export class Picture {
  constructor(url: string, base64: string) {
    this.url = url;
    this.base64 = base64;
  }

  public url: string;
  public base64: string;
}
