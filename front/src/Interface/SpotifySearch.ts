interface artists {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface images {
  height: number;
  width: number;
  url: string;
}

export interface spotifyData {
  album: {
    album_type: string;
    artists: artists[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: images[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_track: number;
    type: string;
    uri: string;
  };
  artists: artists[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_id: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
