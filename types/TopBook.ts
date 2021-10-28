export class TopBook {
  public "@id"?: string;

  constructor(
    _id?: string,
    public id?: number,
    public title?: string,
    public author?: string,
    public part?: string,
    public place?: string,
    public borrowCount?: number
  ) {
    this["@id"] = _id;
  }
}
