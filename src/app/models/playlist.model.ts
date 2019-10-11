export interface Playlist {
  uri: String;
  id: String;
  name: String;
  collaborative: Boolean;
  description: String;
  tracks: Object;
  images: String;
  owner: Object;
  type: String;
  followers: Object;
}
